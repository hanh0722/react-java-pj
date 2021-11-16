import React, {forwardRef} from 'react';
import styles from './NorInput.module.scss';
const NormalInput = forwardRef((props, ref) => {
    return(
        <div className={`${styles.input} ${props.className}`}>
            <input ref={ref} {...props.input}/>
            {props.children}
        </div>
    )
})

export default NormalInput;