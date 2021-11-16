import React, { useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./SwiperBlog.module.scss";
import SlideBlog from "./SlideBlog/SlideBlog";

SwiperCore.use([Navigation, Pagination]);

const SwiperBlog = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const image = useMemo(() => {
    return [
      "http://localhost:8080/image/indoor-1.jpeg",
      "http://localhost:8080/image/indoor-2.jpeg",
      "http://localhost:8080/image/indoor-3.jpeg",
      "http://localhost:8080/image/indoor-4.jpeg",
    ];
  }, []);
  return (
    <Swiper
      navigation={{
        prevEl: prevRef.current ? prevRef.current : undefined,
        nextEl: nextRef.current ? nextRef.current : undefined,
      }}
      onInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }}
      className={styles.swiper}
      onSlideChange={(event) => console.log(event.slides.eq(event.activeIndex))}
      loop={true}
      pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active bullet--active',
          bulletClass: 'swiper-pagination-bullet bullet-normal',
          clickableClass: 'swiper-pagination-clickable swiper-clickable-container'
      }}
      autoplay={{ delay: 5000 }}
      slidesPerView={1}
    >
      {image.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <SlideBlog src={item} />
          </SwiperSlide>
        );
      })}
      <div className={`${styles.navigation} ${styles.prev}`} ref={prevRef}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </div>
      <div className={`${styles.navigation} ${styles.next}`} ref={nextRef}>
        <FontAwesomeIcon icon={faCaretRight} />
      </div>
    </Swiper>
  );
};

export default SwiperBlog;
