import React from "react";
import styles from './RecentPost.module.scss';
import ModelPost from "./ModelPost/ModelPost";
const RecentPost = () => {
    return(
        <div className={styles.recent}>
            <h5>Recent Post</h5>
            <ModelPost/>
        </div>
    )
}

export default RecentPost;