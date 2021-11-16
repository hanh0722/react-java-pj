import React from 'react';
import styles from './Content.module.scss';
const Content = (props) =>{
    return(
        <div className={styles.container}>{props.children}</div>
    )
}

export default Content;