import React from 'react';
import BoxContainer from '../../UI/BoxContainer/BoxContainer';
import styles from './BillingInfor.module.scss';
import Grid from '../../UI/Grid/Grid';
import BillLayout from './BillLayout';
const BillingInfor = () => {
    return(
        <BoxContainer className={styles.container}>
            <p className={styles.title}>Billing Infor</p>
            <Grid className={styles.grid}>
                <BillLayout/>
                <BillLayout/>
                <BillLayout/>   
            </Grid>
        </BoxContainer>
    )
}

export default BillingInfor; 