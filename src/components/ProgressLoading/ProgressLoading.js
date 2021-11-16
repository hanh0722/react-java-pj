import React from "react";
import styles from "./ProgressLoading.module.scss";
import { useSelector } from "react-redux";
import Transition from "../Transition/Transition";
const ProgressLoading = () => {
  const percent = useSelector((state) => state.progress.percent);
  const isLoading = useSelector(state => state.progress.isLoading);
  return (
    <Transition options={{
        unmountOnExit: true,
        mountOnEnter: true,
        classNames: 'fade',
        timeout: 500,
        in: isLoading
    }}>
      <div className={styles.progress}>
        <div style={{ width: `${+percent}%` }} className={styles.loading}></div>
      </div>
    </Transition>
  );
};

export default React.memo(ProgressLoading);
