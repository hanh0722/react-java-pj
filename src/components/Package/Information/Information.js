import React from 'react';
import styles from './Information.module.scss';
const Information = (props) => {
    return(
        <div {...props} className={styles.box}>
            {props.children}
        </div>
    )
}

export default Information;