import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/thumbs/thumbs.min.css";
import SwiperCore, { Navigation, Pagination, Thumbs } from "swiper/core";
import classes from "./ListImage.module.scss";
import MagnifyImage from "../MagnifyImage/MagnifyImage";
import Skeleton from "../UI/LoadingSkeleton/Skeleton";
SwiperCore.use([Navigation, Pagination, Thumbs]);

const ListImage = ({ images, isLoading }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const renderImageSkeleton = (number) => {
    const array = [];
    for (let i = 1; i <= number; i++) {
      array.push(
        <Skeleton key={i} src imageClassName={classes["image-list"]} />
      );
    }
    return array;
  };
  return (
    <>
      <Swiper
        className={`pb-3 ${classes.container}`}
        loop={true}
        spaceBetween={10}
        navigation={isLoading ? false : true}
        thumbs={{ swiper: thumbsSwiper }}
        grabCursor={false}
      >
        {isLoading && (
          <Skeleton src imageClassName={classes["image-zoom-loading"]} />
        )}
        {!isLoading &&
          images &&
          images.map((item) => {
            return (
              <SwiperSlide key={item}>
                <MagnifyImage src={item} magnifieWidth={250} magnifierHeight={250} zoomLevel={1.4}/>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress={true}
        className={`${classes["image__content"]} swiper__card`}
      >
        {isLoading && (
          <div className={classes.grid}>{renderImageSkeleton(4)}</div>
        )}
        {!isLoading &&
          images &&
          images.map((item) => {
            return (
              <SwiperSlide key={item}>
                <img src={item} alt={item} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default ListImage;
