import React from 'react'
import Home from '../Home/Home'
import SetIfscStateDetail from '../../Components/HomeIFSCDetailComponents/SetIfscStateDetail'
import { useSelector } from 'react-redux'

function StateDetailRoute() {
  const { bank: { bankname } } = useSelector((state) => state.ifscSearchDetailInfo);
  return (
    <>
      <Home IFSCDetailTakerComponent={SetIfscStateDetail} />
      <div className="pageContainer">
        <div className="descriptionSectionContainer">
          <div className="descriptionContainer">
            <h1 className='descriptionHeading'>IFSC Code for <span>{bankname}</span></h1>
            <p className='description'><span>{bankname}</span> IFSC code can be used by both the National Electronic Fund Transfer and Real Time Gross Settlement finance transfer systems. <span>{bankname}</span> NEFT, RTGS and IMPS codes are provided by RBI. NEFT transactions are settled in batches while RTGS transactions are settled individually. IMPS presents an instant 24X7, electronic fund transfer. IFSC Code is an 11 character code for identifying bank branches participating in online fund transfers. This code is unique for each branch. Please NOTE that not all branches of a bank provide net banking facility.</p>
          </div>
          <div className="descriptionContainer">
            <h1 className='descriptionHeading'>How to Find <span>{bankname}</span> IFSC Code?</h1>
            <p className='description'>The table alongside provides the <span>{bankname}</span> IFSC code list. One can use this IFSC code finder to find IFSC Code for <span>{bankname}</span> for NEFT or RTGS or IMPS codes before using them. You can find IFSC codes for <span>{bankname}</span> branches in India. Narrow down your search for IFSC Codes either by selecting any particular state from the drop down list or by selecting the state in the table on the right side.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default StateDetailRoute
