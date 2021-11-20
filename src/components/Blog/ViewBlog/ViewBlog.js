import React, { useEffect } from "react";
import SingleBlog from "../SingleBlog/SingleBlog";
import Grid from "../../UI/Grid/Grid";
import Container from "../../layout/container/Container";
import useAxios from "../../../hook/use-axios";
import getCurrentPage from "../../../util/getCurrentPage";
import { useLocation, Redirect, useRouteMatch } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
import { NOT_FOUND } from "../../link/link";
import RenderSkeletonProduct from "../../../util/RenderSkeletonProduct";
import nonAccentVietnamese from "../../removeUnicode/removeUnicode";
import { getBlogByPage } from "../../../config/post/post";
const ViewBlog = () => {
  const { fetchDataFromServer, error, data, isLoading } = useAxios();
  const location = useLocation();
  const page = getCurrentPage(location.search);
  useEffect(() => {
    fetchDataFromServer({
      url: getBlogByPage,
      params: {
        page: page,
        per_page: 2,
      },
    });
  }, [page, fetchDataFromServer]);
  const route = useRouteMatch();
  return (
    <>
      {!isLoading && error && <Redirect to={NOT_FOUND} />}
      <Container>
        <Grid>
          {isLoading && !data && RenderSkeletonProduct(2)}
          {!isLoading &&
            data &&
            data.data.blogs.map((blog) => {
              return (
                <SingleBlog
                  title={blog.title}
                  key={blog._id}
                  imageUrl={blog.cover_image}
                  description={blog.short_description}
                  type={blog.category || "Other"}
                  url={`${route.path}/${blog._id}/${nonAccentVietnamese(blog.title)}`}
                />
              );
            })}
        </Grid>
        {!isLoading && data && (
          <Pagination
            currentPage={page}
            perPage={2}
            totalPage={data.data.total_documents}
          />
        )}
      </Container>
    </>
  );
};

export default ViewBlog;
