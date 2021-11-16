import React from 'react';
import styles from './Hamburger.module.scss'
const Hamburger = (props) =>{
    return (
        <div onClick={props.onClick} className={`${styles.hamburger} ${props.isClicked && styles['transform__origin']}`}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Hamburger;