import React from 'react';
import styles from './BlockService.module.scss';
const BlockService = (props) => {
    return(
        <div className={styles.block} {...props}>
            {props.children}
        </div>
    )
}

export default BlockService;