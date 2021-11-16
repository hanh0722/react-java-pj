import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import { REGISTER_PAGE } from '../components/link/link';
import Success from '../components/Success/Success';
const RegisterOTP = () => {
    const location = useLocation();
    return(
        <>
            <HeaderPage title='Verify' paths={[
                {
                    link: REGISTER_PAGE,
                    name: 'Register'
                },
                {
                    link: location.pathname,
                    name: 'Vefify Account'
                }
            ]}/>
            <Success params={location.search}/>
        </>
    )
}

export default RegisterOTP;