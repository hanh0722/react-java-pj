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
import { getProductByType } from "../../config/product";
import Skeleton from "../UI/LoadingSkeleton/Skeleton";
import Grid from "../UI/Grid/Grid";
import useMedia from '../../hook/use-media';
SwiperCore.use([Navigation, Pagination]);

const ListTree = () => {
  const [type, setType] = useState("indoor");
  const dispatch = useDispatch();
  const desktopScreen = useMedia('(min-width: 991px)');
  const quiteLargeScreen = useMedia('(min-width: 768px)');
  const mediumScreen = useMedia('(min-width: 576px)');
  const smallScreen = useMedia('(min-width: 400px');
  const { isLoading, fetchDataFromServer, error, data } = useAxios();
  useEffect(() => {
    fetchDataFromServer({
      url: getProductByType,
      params: {
        type_product: type,
      },
    });
  }, [fetchDataFromServer, type]);

  const addToWishList = (product) => {
    dispatch(wishListActions.addToWishList(product));
  };
  const renderLoading = useMemo(() => {
    if(desktopScreen){
      return 5;
    } else if(quiteLargeScreen){
      return 4;
    } else if(mediumScreen){
      return 3;
    } else if(smallScreen){
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
          <li
            className={type === "indoor" ? styles.active : ""}
            onClick={() => setType("indoor")}
          >
            Indoor plants
          </li>
          <li
            className={type === "outdoor" ? styles.active : ""}
            onClick={() => setType("outdoor")}
          >
            Outdoor plants
          </li>
          <li
            className={type === "veggies" ? styles.active : ""}
            onClick={() => setType("veggies")}
          >
            Herbs + Veggies
          </li>
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
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
          >
            {data.data.products.map((product) => {
              return (
                <SwiperSlide key={product._id}>
                  <Slide
                    name={product.title}
                    price={product.last_price}
                    imageUrl={product.images.urls[0]}
                    type={product.type_product}
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
            No Products for type {type.toUpperCase()}
          </p>
        )}
      </Container>
    </Content>
  );
};

export default ListTree;
