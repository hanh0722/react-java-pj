import React, { useCallback, useEffect, useMemo, useState } from "react";
import Container from "../../components/DashBoard/layout/Container";
import Header from "../../components/DashBoard/AllBlogs/Header/Header";
import Blog from "../../components/DashBoard/AllBlogs/Blog/Blog";
import GridBlogs from "../../components/DashBoard/AllBlogs/GridBlog/GridBlog";
import useAxios from "../../hook/use-axios";
import { useLocation, Redirect } from "react-router-dom";
import { deleteBlogById, getBlogByPage } from "../../config/post/post";
import Pagination from "../../components/Pagination/Pagination";
import RenderSkeletonProduct from "../../util/RenderSkeletonProduct";
import { DASHBOARD, NOT_FOUND } from "../../components/link/link";
import { useSelector, useDispatch } from "react-redux";
import { NotifyActions } from "../../components/store/NotifyAfterLogin/NotifyAfterLogin";
const AllBlogs = () => {
  const dispatch = useDispatch();
  const { isLoading, data, fetchDataFromServer, error } = useAxios();
  const token = useSelector((state) => state?.isAuth?.token);
  const {
    isLoading: isLoadingDelete,
    data: dataDelete,
    fetchDataFromServer: fetchDataDeleteServer,
    error: errorDelete,
  } = useAxios();
  const [post, setPosts] = useState(null);
  const location = useLocation();
  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    return +page || 1;
  }, [location.search]);
  useEffect(() => {
    fetchDataFromServer({
      url: getBlogByPage,
      params: {
        page: query,
        per_page: 8,
      },
    });
  }, [query, fetchDataFromServer]);

  useEffect(() => {
    if (!isLoading && error) {
      return;
    }
    if (!isLoading && data) {
      setPosts(data?.data?.blogs);
    }
  }, [isLoading, error, data]);

  const removeItemByKey = (id) => {
    fetchDataDeleteServer({
      url: deleteBlogById,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: {
        id: id,
      },
    });
  };

  const filterPostById = useCallback((id) => {
    setPosts((prevState) => {
      return prevState.filter((item) => {
        return item?._id !== id;
      });
    });
  }, []);
  useEffect(() => {
    if (isLoadingDelete) {
      return;
    }
    if (!isLoadingDelete && dataDelete) {
      dispatch(
        NotifyActions.showedNotify({
          message: "Deleted Successfully",
          code: 200,
        })
      );
      filterPostById(dataDelete?.data?._id);
    }
    if (!isLoadingDelete && errorDelete) {
      dispatch(
        NotifyActions.showedNotify({
          message: errorDelete?.message || "Cannot delete",
          code: errorDelete?.code || 500,
        })
      );
    }
  }, [isLoadingDelete, errorDelete, dataDelete, dispatch, filterPostById]);
  return (
    <>
      {!isLoading && error && <Redirect to={NOT_FOUND} />}
      <Container>
        <Header />
        <GridBlogs className="empty--grid">
          {isLoading && RenderSkeletonProduct(8)}
          {!isLoading &&
            post &&
            post?.map((item) => {
              return (
                <Blog
                  removeItemByKey={removeItemByKey}
                  id={item._id}
                  key={item._id}
                  src={item?.cover_image}
                  title={item?.title}
                  date={new Date(item?.time_created).toLocaleDateString(
                    "vi-vn"
                  )}
                  url={`${DASHBOARD}/blog?id=${item._id}&update=true`}
                />
              );
            })}
          {!isLoading && post?.length === 0 && (
            <p className="text-center pt-3">You haven't created any post</p>
          )}
        </GridBlogs>
        {!isLoading && data && post?.length > 0 && (
          <Pagination
            className="pt-5 ps-0"
            currentPage={query}
            perPage={8}
            totalPage={data?.data?.total_documents}
          />
        )}
      </Container>
    </>
  );
};

export default AllBlogs;
