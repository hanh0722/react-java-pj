import React from "react";
import Grid from '../../UI/Grid/Grid';
import styles from './GridBlog.module.scss';
const GridBlogs = (props) => {
    return(
        <Grid className={`${styles.grid} ${props.className}`}>
            {props.children}
        </Grid>
    )
}

export default GridBlogs;