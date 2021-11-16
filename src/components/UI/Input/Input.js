import React from 'react';
import useInput from '../../../hook/use-input';
const Input = (props) => {
    const {valid, isTouched, changeInputHandler, touchedInputHandler} = useInput(value => value.trim().length > 0);
    return(
        <>
            <input {...props.input} onChange={changeInputHandler} onBlur={touchedInputHandler}/>
            {!valid && isTouched && <p className='error__text'>{props.input.label} is not valid!</p>}
        </>
    )
}

export default Input;