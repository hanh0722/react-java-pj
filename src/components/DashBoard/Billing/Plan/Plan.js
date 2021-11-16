import React from "react";
import BoxContainer from "../../UI/BoxContainer/BoxContainer";
import styles from './Plan.module.scss';
import {Button} from '@material-ui/core';
const Plan = () => {
    return(
        <BoxContainer className={styles.container}>
            <div className={`d-flex justify-content-between align-items-center ${styles.title}`}>
                <p>Your plan</p>
                <div className={styles['choose-plan']}>
                    <Button variant="outlined">Cancel Plan</Button>
                    <Button variant='outlined'>Upgrade plan</Button>
                </div>
            </div>
            <p className={styles.type}>Premium</p>
        </BoxContainer>
    )
}

export default Plan;