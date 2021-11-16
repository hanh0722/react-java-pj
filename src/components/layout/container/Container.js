import React from 'react';
import styles from './container.module.scss'
const Container = (props) => {
    return(
        <div className={`${styles.container} ${props.className}`} data-aos={props.aos} {...props.options}>
            {props.children}
        </div>
    )
}

export default Container;