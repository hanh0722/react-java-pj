import React, { useEffect } from "react";
import { useParams, useRouteMatch, Redirect } from "react-router-dom";
import BlogDetail from "../components/Blog/DetailBlog/DetailBlog";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import { Row, Col, Container } from "react-bootstrap";
import RecentBlog from "../components/Blog/RecentBlog/RecentBlog";
import CategoriesBlog from "../components/Blog/CategoriesBlog/CategoriesBlog";
import RecentPost from "../components/Blog/RecentPost/RecentPost";
import styles from "../styles/DetailBlog.module.scss";
import useAxios from "../hook/use-axios";
import { getBlogById } from "../config/post/post";
import Skeleton from "../components/UI/LoadingSkeleton/Skeleton";
import { NOT_FOUND } from "../components/link/link";
const DetailBlog = ({
  data,
  title,
  previewMode,
  paths,
  category,
  user,
  timeCreated,
  content_blog,
  children,
}) => {
  const params = useParams();
  const {
    fetchDataFromServer,
    error,
    data: dataFetching,
    isLoading,
  } = useAxios();
  const route = useRouteMatch();
  useEffect(() => {
    if (previewMode) {
      return;
    }
    fetchDataFromServer({
      url: getBlogById(params.id),
    });
  }, [previewMode, params.id, fetchDataFromServer]);
  const _renderHeader = () => {
    if (previewMode) {
      return <HeaderPage title={title}  paths={paths} />;
    }
    if (!previewMode && !isLoading && dataFetching) {
      return (
        <HeaderPage
          title={dataFetching.data.title}
          paths={[
            {
              name: dataFetching.data.title,
              link: route.url,
            },
          ]}
        />
      );
    }
  };
  const _renderBlogDetail = () => {
    if (previewMode) {
      return (
        <BlogDetail
          category={category}
          user={user?.name}
          timeCreated={timeCreated}
          contentBlog={content_blog}
          title={title}
        />
      );
    }
    if (!isLoading && dataFetching && !previewMode) {
      return (
        <BlogDetail
          category={dataFetching.data.category || "Others"}
          user={"ADMIN"}
          timeCreated={new Date(
            dataFetching.data.time_created
          ).toLocaleDateString("vi-vn")}
          contentBlog={dataFetching.data.content}
          title={dataFetching.data.title}
        />
      );
    }
  };
  return (
    <>
      {!isLoading && error && <Redirect to={NOT_FOUND} />}
      <Container>
        <Row>
          <Col xs={12} sm={12} md={8} lg={8}>
            {isLoading && !previewMode && <Skeleton times={2} />}
            {_renderHeader()}
            {_renderBlogDetail()}
            {!previewMode && <RecentBlog />}
            {children}
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} className={styles.container}>
            {category && <CategoriesBlog category={category} />}
            {!previewMode && <RecentPost />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DetailBlog;
