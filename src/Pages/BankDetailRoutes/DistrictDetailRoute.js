import React from 'react'
import Home from '../Home/Home'
import SetIfscDistrictDetail from '../../Components/HomeIFSCDetailComponents/SetIfscDistrictDetail'
import { useSelector } from 'react-redux'

function DistrictDetailRoute() {
  const { bank: { bankname }, state: { statename } } = useSelector((state) => state.ifscSearchDetailInfo);
  return (
    <>
      <Home IFSCDetailTakerComponent={SetIfscDistrictDetail} />
      <div className="pageContainer">
        <div className="descriptionSectionContainer">
          <div className="descriptionContainer">
            <h1 className='descriptionHeading'><span>{bankname}</span> IFSC Codes in <span>{statename}</span></h1>
            <p className='description'>You can find <span>{statename}</span> <span>{bankname}</span> NEFT, RTGS and IMPS codes in the table alongside. <span>{bankname}</span> NEFT, RTGS and IMPS code is same as IFSC code and used in net banking. Benefit of this fund transfer is, its paperless i.e. there is no need to write cheques or demand drafts. Thus it saves time, effort and energy. Most significantly it saves time as inter-state cheques no longer exists!</p>
          </div>
          <div className="descriptionContainer">
            <h1 className='descriptionHeading'>How to Find IFSC Code for  <span>{bankname}</span>, <span>{statename}</span>?</h1>
            <p className='description'><span>{bankname}</span> IFSC code list in <span>{statename}</span> is given in the table alongside. Details including address and contact numbers of branches of <span>{bankname}</span> with IFSC code in <span>{statename}</span> are also provided. You can narrow down your search either by selecting any particular district from the drop down list or by selecting the link for district in the table on the right side. You can find Industrial Credit And Investment Corporation Of India, <span>{statename}</span> list of IFSC Codes here.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DistrictDetailRoute
