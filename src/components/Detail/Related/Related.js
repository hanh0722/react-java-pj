import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import Slide from "../../ListTree/Slide/Slide";
import styles from "./Related.module.scss";
import DUMMY_DATA from "../../DummyData/DUMMY_DATA";

SwiperCore.use([Navigation, Pagination]);
const Related = () => {
  return (
    <>
    <h2 className={`text-center pt-5 pb-5`}>Related Products</h2>
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
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
      >
        {DUMMY_DATA.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <Slide
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                type={product.type}
                id={product.id}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Related;
