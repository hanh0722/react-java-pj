import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { useLocation, Redirect } from "react-router-dom";
import Overlay from "../../components/overlay/Overlay";
import BlogDashBoard from "../../components/DashBoard/Blog/Blog";
import Container from "../../components/DashBoard/layout/Container";
import { Row, Col } from "react-bootstrap";
import Options from "../../components/DashBoard/Blog/Options/Options";
import { checkInputIsEmpty } from "../../util";
import useAxios from "../../hook/use-axios";
import { createPostApi, updateBlogById } from "../../config/post/post";
import { useSelector, useDispatch } from "react-redux";
import { NotifyActions } from "../../components/store/NotifyAfterLogin/NotifyAfterLogin";
import Preview from "../../components/DashBoard/Blog/Preview/Preview";
import Transition from "../../components/Transition/Transition";
import useToggle from "../../hook/use-toggle";
import { getBlogById } from "../../config/post/post";
import { NOT_FOUND } from "../../components/link/link";
const Blog = () => {
  const token = useSelector((state) => state.isAuth.token);
  const user = useSelector((state) => state.user.user);
  const [getValueEditor, setGetValueEditor] = useState("");
  const [description, setDescription] = useState("");
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [images, setImages] = useState(null);
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [category, setCategory] = useState(undefined);
  const dispatch = useDispatch();
  const { fetchDataFromServer, data, isLoading, error } = useAxios();
  const {
    fetchDataFromServer: fetchBlogFromServer,
    data: dataBlog,
    isLoading: isLoadingBlog,
    error: errorBlog,
  } = useAxios();
  const { toggle: isPreview, changeToggleHandler: setPreview } =
    useToggle(false);
  const location = useLocation();
  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const update = params.get("update");
    return {
      id: id,
      update: update ? Boolean(update) : null,
    };
  }, [location.search]);

  useEffect(() => {
    const { id, update } = query;
    if (!id || !update) {
      return;
    }
    fetchBlogFromServer({
      url: getBlogById(id),
    });
  }, [query.id, query.update, fetchBlogFromServer, query]);
  useEffect(() => {
    const { id, update } = query;
    if (!id || !update) {
      return;
    }
    if (!isLoadingBlog && errorBlog) {
      return;
    }
    if (!isLoadingBlog && dataBlog) {
      const {
        title,
        short_description,
        content,
        cover_image,
        is_public,
        category,
      } = dataBlog?.data;
      setTitle(title);
      setDescription(short_description);
      setImages([cover_image]);
      setIsPublic(is_public);
      setGetValueEditor(content);
      setCategory(category);
    }
  }, [query, isLoadingBlog, dataBlog, errorBlog]);
  const submitBlogHandler = (event) => {
    const { update, id } = query;
    if (
      !checkInputIsEmpty(title) ||
      !checkInputIsEmpty(getValueEditor) ||
      !checkInputIsEmpty(description)
    ) {
      return;
    }
    event.preventDefault();
    const blogObjectMatchServer = {
      title: title,
      category: category ? category : null,
      content: getValueEditor,
      short_description: description,
      is_public: isPublic,
      cover_image: images[0],
    };
    fetchDataFromServer({
      url: update ? updateBlogById(id) : createPostApi,
      method: update ? "PUT" : "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: blogObjectMatchServer,
    });
  };
  const setTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  const setDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const getFileOfDropzone = useCallback((files) => {
    setImages(files);
  }, []);
  useEffect(() => {
    const { update } = query;
    if (!isLoading && data) {
      dispatch(
        NotifyActions.showedNotify({
          message: update ? "Updated Blog Successfully" : "Created Blog Successfully",
          code: 200,
        })
      );
    }
    if (!isLoading && error) {
      dispatch(
        NotifyActions.showedNotify({
          message: error.message || "Please try again!, error",
          code: error.code || 500,
        })
      );
    }
  }, [error, dispatch, isLoading, data, query]);
  useEffect(() => {
    if (isPreview) {
      document.body.setAttribute("fixed-body", "fixed");
    } else {
      document.body.removeAttribute("fixed-body");
    }
  }, [isPreview]);
  const previewPostHandler = () => {
    setPreview();
  };
  return (
    <>
      {!isLoadingBlog && errorBlog && <Redirect to={NOT_FOUND} />}
      <Container>
        <form onSubmit={submitBlogHandler}>
          <Row>
            <Col xs={12} sm={12} md={8} lg={8}>
              <BlogDashBoard
                setTitleHandler={setTitleHandler}
                setGetValueEditor={setGetValueEditor}
                setDescriptionHandler={setDescriptionHandler}
                getFileOfDropzone={getFileOfDropzone}
                setImageIsLoading={setImageIsLoading}
                valueEditor={getValueEditor}
                initialDescription={
                  dataBlog ? dataBlog?.data?.short_description : ""
                }
                initialTitle={dataBlog ? dataBlog?.data?.title : ""}
                defaultEditor={dataBlog ? dataBlog?.data?.content : ""}
                imageDefault={dataBlog ? dataBlog?.data?.cover_image : null}
              />
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <Options
                editorIsLoading={imageIsLoading}
                isSubmit={submitBlogHandler}
                setIsPublic={setIsPublic}
                setCategory={setCategory}
                category={category ? category : ""}
                onPreview={previewPostHandler}
                defaultCategory={dataBlog ? dataBlog?.data?.category : ""}
                update={query.update}
              />
            </Col>
          </Row>
        </form>
      </Container>
      <Transition
        options={{
          timeout: 750,
          classNames: "scale",
          in: isPreview,
          unmountOnExit: true,
          mountOnEnter: true,
        }}
      >
        <>
          <Preview
            data={{
              title: title,
              valueEditor: getValueEditor,
              description: description,
              images: images,
              category: category,
              user: user?.user,
              removePreview: setPreview,
            }}
          />
          {ReactDOM.createPortal(
            <Overlay />,
            document.getElementById("bg__ol")
          )}
        </>
      </Transition>
    </>
  );
};

export default Blog;
