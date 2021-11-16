import React from 'react';
import styles from './LayoutList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const LayoutList = props =>{
    return (
        <div className={`${props.className} ${styles.layout} ${props.isClicked && styles.back}`}>
            <p onClick={props.setBack} className={styles.icon}><FontAwesomeIcon icon={faArrowLeft}/> Back</p>
            {props.children}
        </div>
    )
}

export default LayoutList;