import React, { useRef } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import styles from "./RecentBlog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import SlideBlog from "./SlideBlog/SlideBlog";
SwiperCore.use([Navigation, Pagination]);
const RecentBlog = () => {
  const nextRef = useRef();
  const prevRef = useRef();
  return (
    <div className={`text-center position-relative ${styles.container}`}>
      <h4>Related Articles</h4>
      <Swiper
        className={styles.swiper}
        loop={true}
        pagination={{ clickable: true }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide>
          <SlideBlog />
        </SwiperSlide>
        <SwiperSlide>
          <SlideBlog />
        </SwiperSlide>
        <SwiperSlide>
          <SlideBlog />
        </SwiperSlide>
        <div
          className={`${styles["navigation-swiper"]} ${styles.left}`}
          ref={prevRef}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div
          className={`${styles["navigation-swiper"]} ${styles.right}`}
          ref={nextRef}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </Swiper>
    </div>
  );
};

export default RecentBlog;
