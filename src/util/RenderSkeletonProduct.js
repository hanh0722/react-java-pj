import Skeleton from "../components/UI/LoadingSkeleton/Skeleton";
import styles from "../styles/RenderSkeletonProduct.module.scss";
const RenderSkeletonProduct = (number) => {
  const arrayRender = [];
  for (let i = 0; i < number; i++) {
    arrayRender.push(
      <div key={i} className={styles.loading}>
        <Skeleton
          src
          times={2}
          imageClassName={styles.image}
          containerSkeleton={styles.container}
          className={styles['container-loading']}
          block
          key={i}
          isLoading={true}
        />
      </div>
    );
  }
  return arrayRender;
};

export default RenderSkeletonProduct;
