import React from 'react';
import styles from '../hamburger/Hamburger.module.scss';
const CloseButton = (props) =>{
    return(
        <div {...props} className={`${styles.hamburger} ${styles['transform__origin']} ${styles['absolute-btn']}`} style={{display: 'block'}}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default CloseButton;
