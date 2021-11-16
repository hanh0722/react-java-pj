import React from "react";
import styles from './BoxContainer.module.scss';
const BoxContainer = ({children, className}) => {
    return(
        <div className={`${styles.container} ${className}`}>
            {children}
        </div>
    )
}

export default BoxContainer;