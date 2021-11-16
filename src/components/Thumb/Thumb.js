import React from 'react';
import styles from './Thumb.module.scss'
const Thumb = (props) =>{
    return(
        <div className={`${styles.thumb} ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Thumb;