import React, { useEffect, useState, useRef, useMemo } from "react";
import { useRouteMatch, useLocation, Redirect } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../components/styles/DetailItem.module.scss";
import ReactDOM from "react-dom";
import Overlay from "../components/overlay/Overlay";
import { CSSTransition } from "react-transition-group";
import FixLayout from "../components/FixLayout/FixLayout";
import BoxInput from "../components/FixLayout/BoxInput/BoxInput";
import FormContact from "../components/FormContact/FormContact";
import MoreDetail from "../components/Detail/MoreDetail/MoreDetail";
import ListImage from "../components/ListImage/ListImage";
import LinkCheckOut from "../components/ListImage/LinkCheckout/LinkCheckout";
import useScroll from "../hook/use-scroll";
import useToggle from "../hook/use-toggle";
import Related from "../components/Detail/Related/Related";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import useAxios from "../hook/use-axios";
import { getProductById } from "../config/product";
import DetailProduct from "../components/Detail/DetailProduct/DetailProduct";
import { NOT_FOUND } from "../components/link/link";

const DetailItem = () => {
  const location = useLocation();
  const { isLoading, error, fetchDataFromServer, data } = useAxios();
  const [content, setContent] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const route = useRouteMatch();
  const inputRef = useRef();
  const isValid = useScroll(100);
  const getProductId = useMemo(() => {
    const allParams = new URLSearchParams(location.search);
    return allParams.get("id");
  }, [location.search]);
  useEffect(() => {
    fetchDataFromServer({
      url: getProductById(getProductId),
    });
  }, [fetchDataFromServer, getProductId]);
  const { toggle, changeToggleHandler } = useToggle(false);
  const getCopyHandler = () => {
    navigator.clipboard.writeText(inputRef.current.value);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };
  return (
    <>
      {!isLoading && error && <Redirect to={NOT_FOUND} />}
      <HeaderPage
        isLoading={isLoading}
        title={data?.data?.product?.title}
        paths={[
          {
            name: data?.data?.product?.title,
            link: `${route.url}?id=${getProductId}`,
          },
        ]}
      />
      <Container className={styles.container}>
        <Row className={`${styles.row} justify-content-around`}>
          <Col xs={12} sm={12} md={6} lg={5} className={styles.image}>
            <ListImage
              isLoading={isLoading}
              images={data?.data?.product?.images?.urls}
            />
          </Col>
          <DetailProduct
            isLoading={isLoading}
            product={data?.data?.product}
            changeToggleHandler={changeToggleHandler}
            setContent={setContent}
          />
        </Row>
        <MoreDetail isLoading={isLoading} detail={data?.data?.product} />
        <Related />
      </Container>
      <CSSTransition
        timeout={700}
        classNames="go-up"
        unmountOnExit
        mountOnEnter
        in={isValid}
      >
        <LinkCheckOut
          product={data?.data?.product}
          isLoading={isLoading}
          url={data?.data?.product?.images?.urls[0]}
        />
      </CSSTransition>
      <CSSTransition
        in={toggle}
        unmountOnExit
        mountOnEnter
        timeout={800}
        classNames="fade__box"
      >
        <>
          <FixLayout>
            {content === "share" && (
              <BoxInput
                onClick={changeToggleHandler}
                input={{
                  type: "text",
                  defaultValue: window.location.href,
                }}
                ref={inputRef}
                copyBoard={getCopyHandler}
                isCopied={isCopied}
              />
            )}
            {content === "ask" && <FormContact onClick={changeToggleHandler} />}
          </FixLayout>
          {ReactDOM.createPortal(
            <Overlay
              onClick={() => {
                changeToggleHandler();
                setIsCopied(false);
              }}
              style={{ zIndex: "20" }}
            />,
            document.getElementById("portal__pd")
          )}
        </>
      </CSSTransition>
    </>
  );
};

export default DetailItem;
