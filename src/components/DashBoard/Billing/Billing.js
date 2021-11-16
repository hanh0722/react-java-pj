import React from 'react';
import Plan from './Plan/Plan';
import { Col, Row } from 'react-bootstrap';
import BillingInfor from './BillingInfor/BillingInfor';
import InvoiceHistory from './InvoiceHistory/InvoiceHistory';
const Billing = () => {
    return(
        <Row>
            <Col xs={12} sm={12} md={8} lg={8}>
                <Plan/>
                <BillingInfor/>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
                <InvoiceHistory/>
            </Col>
        </Row>
    )
}

export default Billing;