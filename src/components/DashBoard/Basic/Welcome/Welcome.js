import React from "react";
import BoxContainer from "../../UI/BoxContainer/BoxContainer";
import styles from "./Welcome.module.scss";
import IconIntroduction from "../../../../icon/Dashboard/Introduction-icon";
import Image from "../../../../image/download.png";
import Skeleton from "../../../UI/LoadingSkeleton/Skeleton";
import { Button } from "@material-ui/core";
const Welcome = ({ user, isLoading }) => {
  return (
    <BoxContainer className={`${styles.container} d-flex align-items-center`}>
      <div
        className={`d-flex justify-content-between align-items-center w-100 ${styles.content}`}
      >
        {isLoading && <Skeleton src times={8} reverse classSkeleton={styles.skeleton} imageClassName={styles['image-skeleton']}/>}
        {!isLoading && user && (
          <>
            <div className={styles.text}>
              <h4>Welcome back - {user.user.name}</h4>
              <p>Go to introduction document</p>
              <Button variant="contained">Introduce</Button>
            </div>
            <div className={styles.image}>
              <IconIntroduction />
              <img src={Image} alt="" />
            </div>
          </>
        )}
      </div>
    </BoxContainer>
  );
};

export default Welcome;
