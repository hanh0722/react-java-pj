import React, { forwardRef } from 'react';
import styles from './Input.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
const Input = forwardRef((props, ref) => {
    return (
        <div className={`${props.className}`}>
            <div className={styles.search}>
                <input {...props.input} ref={ref}/>
                {props.hasValue && <FontAwesomeIcon onClick={props.setValueHandler} className={styles.close} icon={faTimes}/>}
                <FontAwesomeIcon icon={faSearch}/>
            </div>
        </div>
    )
})

export default Input;