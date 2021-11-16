import React from 'react';
import {Button} from '@material-ui/core';
import styles from './ButtonDashBoard.module.scss';
const ButtonDashBoard = (props) => {
    return(
        <Button className={`${styles.button} ${props.className}`} variant="contained" {...props}>
            {props.children}
        </Button>
    )
}

export default ButtonDashBoard;