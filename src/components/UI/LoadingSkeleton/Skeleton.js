import React from "react";
import styles from "./Skeleton.module.scss";

const Skeleton = ({
  src,
  round,
  times,
  style,
  className,
  classSkeleton,
  reverse,
  imageClassName,
  containerSkeleton,
  block,
}) => {
  const renderSkeleton = () => {
    const arraySkeleton = [];
    for (let i = 0; i < times; i++) {
      arraySkeleton.push(
        <div key={i} className={`${styles.skeleton} ${classSkeleton}`} />
      );
    }
    return arraySkeleton;
  };
  return (
    <>
      <div
        className={`${
          src &&
          times !== 0 &&
          `d-flex ${
            reverse && "flex-row-reverse"
          } justify-content-between align-items-center ${block && "d-block"}`
        } ${styles.container} ${className}`}
      >
        {src && (
          <div
            className={`${styles.skeleton} ${styles.image} ${
              round && styles.round
            } ${imageClassName}`}
            style={{ ...style }}
          />
        )}
        <div className={containerSkeleton ? containerSkeleton : ""}>
          {renderSkeleton()}
        </div>
      </div>
    </>
  );
};

export default Skeleton;
