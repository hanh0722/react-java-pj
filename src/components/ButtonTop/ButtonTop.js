import React from 'react';
import styles from './ButtonTop.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
const ButtonTop = (props) => {
    const state = useSelector(state => state.button.isNearTop);
    return(
        <div {...props} className={`${styles.button} ${state && styles.back} d-flex justify-content-center align-items-center`}>   
            <FontAwesomeIcon icon={faArrowUp}/>
        </div>
    )
}

export default ButtonTop;