import React from 'react';
import styles from './BillLayout.module.scss';
import Ripple from '../../../UI/Ripple/Ripple';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
const BillLayout = () => {
    return(
        <div className={styles.container}>
            <h5>Jayvion Simon</h5>
            <p className={styles.address}>Address: Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, laudantium!</p>
            <p>Phone: 0356365569</p>
            <div className={`d-flex align-items-center`}>
            <Ripple className={styles.ripple}>
                <span className={`d-flex align-items-center ${styles.delete}`}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                    <span>Delete</span>
                </span>
            </Ripple>
            <Ripple className={styles.ripple}>
                <span className={`d-flex align-items-center ${styles.edit}`}>
                    <FontAwesomeIcon icon={faPencilAlt}/>
                    <span>Edit</span>
                </span>
            </Ripple>
            </div>
        </div>
    )
}

export default BillLayout;