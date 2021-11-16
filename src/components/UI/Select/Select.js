import React from 'react';
import styles from './Select.module.scss';
const Select = (props) => {
    return(
        <select className={`${styles.select} ${props.className}`} onChange={props.onChange}>
            {props.children}
        </select>
    )
}

export default Select;