import React from 'react'
import Home from './Home'
import HeaderTags from '../../Components/HeaderTags';

function MainHome() {
    return (
        <>
            <HeaderTags
                title={`${process.env.REACT_APP_NAME} | Find IFSC, MICR Codes, Address, All Bank Branches in India, for NEFT, RTGS, UPI, IMPS`}
                description={`Find IFSC, MICR Codes, Address, All Bank Branches in India, for NEFT, RTGS, IMPS, UPI. Find IFSC, MICR Codes, Address, All Bank Branches in India, for NEFT, RTGS, IMPS Transactions`}
            />
            <Home />
        </>
    )
}

export default MainHome
