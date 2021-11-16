import React from 'react';
import styles from './Modal.module.scss';

const Modal = (props) => {
    return(
        <div className={`${styles.modal} ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Modal;