import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import styles from "./SearchBar.module.scss";
import useInput from "../../hook/use-input";
import Grid from "../UI/Grid/Grid";
import CloseButton from "../UI/CloseButton";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { hamburgerActions } from "../store/hamburgerSlice";
import Overlay from "../overlay/Overlay";
import ReactDOM from "react-dom";
import SearchItems from "../SearchItems/SearchItems";
import { Container, Row } from "react-bootstrap";
import { Button } from "@material-ui/core";
import useAxios from "../../hook/use-axios";
import { getProductByKeyword } from "../../config/product/product";
import Skeleton from "../UI/LoadingSkeleton/Skeleton";
import nonAccentVietnamese from "../removeUnicode/removeUnicode";
import { Link } from "react-router-dom";
import { SHOP } from "../link/link";
const SearchBar = ({ isShowed }) => {
  const {
    valid,
    value,
    changeInputHandler,
    touchedInputHandler,
    isTouched,
    resetHandler,
  } = useInput((value) => value.trim().length >= 0);
  const { isLoading, data, fetchDataFromServer } = useAxios();
  const dispatch = useDispatch();
  const [isTyping, setIsTyping] = useState(false);
  const changeLayoutHandler = () => {
    dispatch(hamburgerActions.searchSlide());
  };
  const submitHandler = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (!isShowed) {
      return;
    }
    setIsTyping(true);
    const timeout = setTimeout(() => {
      fetchDataFromServer({
        url: getProductByKeyword,
        params: {
          keyword: value,
        },
      });
      setIsTyping(false);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, fetchDataFromServer, isShowed]);
  useEffect(() => {
    if(isShowed){
      document.body.setAttribute('data-sp', 'open');
    } else {
      document.body.removeAttribute('data-sp');
    }
  }, [isShowed]);
  const _renderSkeleton = (number) => {
    const skeleton = [];
    for (let i = 0; i < number; i++) {
      skeleton.push(
        <Skeleton
          key={i}
          src
          times={2}
          imageClassName={styles.image}
          classSkeleton={styles.skeleton}
          className={styles.contain}
        />
      );
    }
    return skeleton;
  };
  return (
    <CSSTransition
      in={isShowed}
      mountOnEnter
      unmountOnExit
      timeout={500}
      classNames="slide"
    >
      <>
        <form onSubmit={submitHandler} className={styles.container}>
          <Container className={styles["grid__layout"]} fluid>
            <div className={`${styles["line__box"]} w-100 p-20`}>
              <div
                className={`d-flex justify-content-between align-items-center ${styles.row}`}
              >
                <p>Search our store...!</p>
                <CloseButton
                  onClick={() => {
                    changeLayoutHandler();
                    resetHandler();
                  }}
                />
              </div>
              <Input
                input={{
                  placeholder: "Search Products...",
                  onChange: changeInputHandler,
                  onBlur: touchedInputHandler,
                  value: value,
                  className: !valid && isTouched ? "error__input" : "",
                }}
                hasValue={value.trim().length > 0}
                setValueHandler={resetHandler}
              />
              {(isLoading || isTyping) && (
                <Grid className={styles.grid}>{_renderSkeleton(6)}</Grid>
              )}
              {!isLoading && !isTyping && data?.data?.products?.length === 0 && (
                <p className="error__text text-center">
                  No result for <span>"{value}"</span>
                </p>
              )}
            </div>
            <div className={styles["flow__items"]}>
              {!isLoading && !isTyping && data?.data?.products?.length > 0 && (
                <>
                  <Row className={`${styles.items}`}>
                    {!isLoading &&
                      data?.data?.products?.length > 0 &&
                      data?.data?.products?.map((product, index) => {
                        return (
                          <SearchItems
                            key={product?._id}
                            type={product?.category || "Others"}
                            price={product?.last_price}
                            name={product?.title}
                            url={`/shop/${nonAccentVietnamese(product?.title)}?id=${product?._id}`}
                            imageUrl={
                              product?.image_urls[0]
                                ? product?.image_urls[0]
                                : ""
                            }
                            id={product?._id}
                            resetHandler={resetHandler}
                          />
                        );
                      })}
                  </Row>
                  {!isLoading && !isTyping && data?.data?.total_documents > 6 && (
                    <div className={`text-center pt-4`}>
                      <Link to={SHOP}>
                      <Button
                        type="submit"
                        className="button"
                        variant="contained"
                      >
                        More Results!
                      </Button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </Container>
        </form>
        {ReactDOM.createPortal(
          <Overlay
            onClick={() => {
              changeLayoutHandler();
              resetHandler();
            }}
          />,
          document.getElementById("bg__ol")
        )}
      </>
    </CSSTransition>
  );
};

export default SearchBar;
