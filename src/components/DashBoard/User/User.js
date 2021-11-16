import React from "react";
import styles from "./User.module.scss";
import imageDefault from "../../../image/default-user.jpg";
import { Link } from "react-router-dom";
import { DASHBOARD_MATERIAL } from "../../link/link";
import Skeleton from "../../UI/LoadingSkeleton/Skeleton";
const User = ({ toggle, isLoading, data }) => {
  return (
    <div
      className={`${styles.user} d-flex align-items-center ${
        toggle && `${styles.back}`
      }`}
    >
      {isLoading ? (
        <>
        <Skeleton times={4} containerSkeleton={styles.skeleton} src round/>
       </>
      ) : (
        data && 
        <>
          <div className={styles.image}>
            <img src={data.user.avatar ? data.user.avatar : imageDefault} alt="" />
          </div>
          <div className={styles.flow}>
            <div className={styles.content}>
              <Link to={DASHBOARD_MATERIAL.CHANGE_VALUE_USER}>{data.user.name}</Link>
              <p className={styles.email}>{data.user.email}</p>
              {data.user.admin && <p className={styles.role}>Admin</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
