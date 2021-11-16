import React from 'react';
import styles from './Grid.module.scss';
const Grid = props => {
    return(
        <div className={`${styles.grid} ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Grid;