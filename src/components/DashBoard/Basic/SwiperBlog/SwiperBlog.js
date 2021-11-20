import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./SwiperBlog.module.scss";
import SlideBlog from "./SlideBlog/SlideBlog";
import { getBlogByPage } from "../../../../config/post/post";
import useAxios from "../../../../hook/use-axios";
import Skeleton from "../../../UI/LoadingSkeleton/Skeleton";
SwiperCore.use([Navigation, Pagination]);

const SwiperBlog = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { isLoading, data, fetchDataFromServer, resetAllHandler } = useAxios();
  useEffect(() => {
    fetchDataFromServer({
      url: getBlogByPage,
      params: {
        page: 1,
        per_page: 4,
      },
    });
    return () => {
      resetAllHandler();
    }
  }, [fetchDataFromServer, resetAllHandler]);
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
        bulletActiveClass: "swiper-pagination-bullet-active bullet--active",
        bulletClass: "swiper-pagination-bullet bullet-normal",
        clickableClass:
          "swiper-pagination-clickable swiper-clickable-container",
      }}
      autoplay={{ delay: 5000 }}
      slidesPerView={1}
      
    >
      {isLoading && (
        <SwiperSlide>
          <Skeleton src imageClassName={styles.image}/>
        </SwiperSlide>
      )}
      {!isLoading && data && data?.data?.blogs?.map(item => {
        return (
          <SwiperSlide key={item._id}>
            <SlideBlog src={item?.cover_image} title={item?.title} short_description={item?.short_description} category={item?.category || "Others"}/>
          </SwiperSlide>
        )
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
