import React from "react";
import styles from './ModelPost.module.scss';
import Grid from '../../../UI/Grid/Grid';
import { Link } from "react-router-dom";
import p1 from '../../../../image/1_540x.png';
const ModelPost = () => {
    return(
        <Grid className={styles.post}>
            <div className={styles.image}>
                <img src={p1} alt=""/>
            </div>
            <div className={styles.content}>
                <p>Accessories</p>
                <Link to='/'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, omnis!</Link>
            </div>
        </Grid>
    )
}

export default ModelPost;