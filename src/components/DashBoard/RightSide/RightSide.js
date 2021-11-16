import React from 'react';
import styles from './RightSide.module.scss';
const RightSide = props => {
    return(
        <div className={styles.right}>
            {props.children}
        </div>
    )
}

export default RightSide;