import React, { useEffect, useMemo, useState } from "react";
import Container from "../layout/container/Container";
import Content from "../layout/Content/Content";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import styles from "./ListTree.module.scss";
import Slide from "./Slide/Slide";
import { useDispatch } from "react-redux";
import { wishListActions } from "../store/wish-list";
import useAxios from "../../hook/use-axios";
import {
  getProductByType,
  getAllTypesOfProducts,
} from "../../config/product/product";
import Skeleton from "../UI/LoadingSkeleton/Skeleton";
import Grid from "../UI/Grid/Grid";
import useMedia from "../../hook/use-media";

SwiperCore.use([Navigation, Pagination]);

const ListTree = () => {
  const [type, setType] = useState("indoor");
  const dispatch = useDispatch();
  const desktopScreen = useMedia("(min-width: 991px)");
  const quiteLargeScreen = useMedia("(min-width: 768px)");
  const mediumScreen = useMedia("(min-width: 576px)");
  const smallScreen = useMedia("(min-width: 400px");
  const { isLoading, fetchDataFromServer, error, data } = useAxios();
  const {
    isLoading: isLoadingType,
    fetchDataFromServer: fetchTypeServer,
    error: errorType,
    data: dataType,
  } = useAxios();
  useEffect(() => {
    fetchDataFromServer({
      url: getProductByType(type),
    });
  }, [fetchDataFromServer, type]);

  useEffect(() => {
    fetchTypeServer({
      url: getAllTypesOfProducts,
    });
  }, [fetchTypeServer]);
  const addToWishList = (product) => {
    dispatch(wishListActions.addToWishList(product));
  };
  const renderLoading = useMemo(() => {
    if (desktopScreen) {
      return 5;
    } else if (quiteLargeScreen) {
      return 4;
    } else if (mediumScreen) {
      return 3;
    } else if (smallScreen) {
      return 2;
    } else {
      return 1;
    }
  }, [desktopScreen, quiteLargeScreen, mediumScreen, smallScreen]);
  const renderSkeleton = (number) => {
    const arraySkeleton = [];
    for (let i = 0; i < number; i++) {
      arraySkeleton.push(
        <div key={i}>
          <Skeleton
            imageClassName={styles["image-loading"]}
            src
            times={2}
            className={styles.loading}
            containerSkeleton="pt-3"
          />
        </div>
      );
    }
    return arraySkeleton;
  };
  return (
    <Content>
      <Container aos="fade-up">
        <h3 className={`text-center ${styles.title}`}>Perfect Plants</h3>
        <ul className={styles.options}>
          {isLoadingType && <Skeleton times={1} />}
          {!isLoadingType && errorType && <p className="text-center error__text">Cannot get types</p>}
          {!isLoadingType &&
            dataType &&
            dataType?.data?.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => setType(item)}
                  className={type === item ? styles.active : ""}
                >
                  {item} plants
                </li>
              );
            })}
        </ul>
        {!isLoading && error && (
          <p className="text-center">Something went wrong, please try again</p>
        )}
        {isLoading && (
          <Grid className={styles["loading-grid"]}>
            {renderSkeleton(renderLoading)}
          </Grid>
        )}
        {!isLoading && data && (
          <Swiper
            className={styles.swiper}
            breakpoints={{
              200: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              576: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            loop={false}
            navigation={data?.data?.products.length === 0 ? false : true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
          >
            {data.data.products.map((product) => {
              return (
                <SwiperSlide key={product._id}>
                  <Slide
                    name={product.title}
                    price={product.last_price}
                    imageUrl={product.image_urls[0]}
                    type={product.category}
                    id={product._id}
                    addtoWishList={addToWishList}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        {!isLoading && data?.data?.products?.length === 0 && (
          <p className="text-center">
            No Products for type <span className="error__text">{type.toUpperCase()}</span>
          </p>
        )}
      </Container>
    </Content>
  );
};

export default ListTree;
