import React from "react";
import styles from './LayoutTop.module.scss';

const LayoutTop = (props) => {
    return(
        <div className={`${styles.container} ${props.className}`}>
            {props.children}
        </div>
    )
}

export default React.memo(LayoutTop);