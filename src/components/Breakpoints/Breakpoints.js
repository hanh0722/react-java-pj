import React from 'react';
import styles from './Breakpoints.module.scss';
const Breakpoints = (props) => {
    return(
        <div className={`${styles.point} ${props.className} d-flex justify-content-center align-items-center`}>
            {props.children}
        </div>
    )
}

export default Breakpoints;