import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Overlay from "../../components/overlay/Overlay";
import BlogDashBoard from "../../components/DashBoard/Blog/Blog";
import Container from "../../components/DashBoard/layout/Container";
import { Row, Col } from "react-bootstrap";
import Options from "../../components/DashBoard/Blog/Options/Options";
import { checkInputIsEmpty } from "../../util";
import useAxios from "../../hook/use-axios";
import { createPostApi } from "../../config/post/post";
import { useSelector, useDispatch } from "react-redux";
import { NotifyActions } from "../../components/store/NotifyAfterLogin/NotifyAfterLogin";
import Preview from "../../components/DashBoard/Blog/Preview/Preview";
import Transition from "../../components/Transition/Transition";
import useToggle from "../../hook/use-toggle";
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
  const { toggle: isPreview, changeToggleHandler: setPreview } =
    useToggle(false);
  const submitBlogHandler = (event) => {
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
      category: category ? category[0] : null,
      content: getValueEditor,
      short_description: description,
      is_public: isPublic,
      cover_image: images[0],
    };
    fetchDataFromServer({
      url: createPostApi,
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        'Content-Type': 'application/json'
      },
      data: blogObjectMatchServer
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
    if (!isLoading && data) {
      dispatch(
        NotifyActions.showedNotify({
          message: "Created Blog Successfully",
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
  }, [error, dispatch, isLoading, data]);
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
