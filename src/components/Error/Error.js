import React from 'react';
import Modal from '../Modal/Modal';
import styles from './Error.module.scss';
const Error = props => {
    return(
        <Modal>
            <div className={`${styles.error} ${props.className}`}>
                {props.children}
            </div>
        </Modal>
    )
}

export default Error;