import React, { useEffect } from 'react'
import Home from '../Home/Home'
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { setLoadingState } from '../../Middlewares/ReduxStore/ToggleStateSlice';
import { setIfscFetchedDetails } from '../../Middlewares/ReduxStore/IfscFetchDetails';
import { setIFSCSearchDetailInfo } from '../../Middlewares/ReduxStore/IfscSearchDetailInfo';
import { nameConverter } from '../../Utils/RoutingFormats';
import axiosFetchBankDataInstance from '../../Middlewares/AxiosInstance/AxiosInstance';

function DistrictDetailRoute() {
  const { bank: { bankname }, state: { statename } } = useSelector((state) => state.ifscSearchDetailInfo);
  const { bankNameSlug, stateNameSlug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const capsBankName = nameConverter(bankNameSlug);
  const capsStateName = nameConverter(stateNameSlug);

  useEffect(() => {
    if (bankNameSlug && stateNameSlug && !statename) {
      dispatch(setLoadingState(true));
      axiosFetchBankDataInstance({
        url: "api/bank-name/state/city",
        data: {
          BANK: capsBankName,
          STATE: capsStateName,
        },
      }).then((res) => {
        console.log(res.data, 'District Page');
        dispatch(setIFSCSearchDetailInfo({ key: 'bank', value: { bankname: res.data.requestBody.BANK } }));
        dispatch(setIFSCSearchDetailInfo({ key: 'state', value: { statename: res.data.requestBody.STATE } }));
        dispatch(setIfscFetchedDetails({ key: 'district', value: res.data.data }))
      }).catch((err) => {
        console.log(err);
        alert(err.message);
        navigate(`/`);
      }).finally(() => {
        dispatch(setLoadingState(false));
      });
    }
  }, [statename, bankNameSlug, stateNameSlug, capsBankName, capsStateName, dispatch, navigate])

  return (
    <>
      <Helmet>
        <title>{`${capsBankName}, ${capsStateName} All Branch Addresses, Phone, IFSC code, MICR code`} </title>
        <meta name="description" content={`${capsBankName}, ${capsStateName} All Branch Addresses, Phone, IFSC code, MICR code, Find IFSC, MICR Codes, Address, All Bank Branches in India, for NEFT, RTGS, ECS Transactions`} />
      </Helmet>
      <Home />
      <div className="pageContainer">
        <div className="descriptionSectionContainer">
          <div className="descriptionContainer">
            <h1 className='descriptionHeading'><span>{bankname}</span> IFSC Codes in <span>{statename}</span></h1>
            <p className='descriptionPara'>You can find <span>{statename}</span> <span>{bankname}</span> NEFT, RTGS and IMPS codes in the table alongside. <span>{bankname}</span> NEFT, RTGS and IMPS code is same as IFSC code and used in net banking. Benefit of this fund transfer is, its paperless i.e. there is no need to write cheques or demand drafts. Thus it saves time, effort and energy. Most significantly it saves time as inter-state cheques no longer exists!</p>
          </div>
          <div className="descriptionContainer">
            <h1 className='descriptionHeading'>How to Find IFSC Code for  <span>{bankname}</span>, <span>{statename}</span>?</h1>
            <p className='descriptionPara'><span>{bankname}</span> IFSC code list in <span>{statename}</span> is given in the table alongside. Details including address and contact numbers of branches of <span>{bankname}</span> with IFSC code in <span>{statename}</span> are also provided. You can narrow down your search either by selecting any particular district from the drop down list or by selecting the link for district in the table on the right side. You can find Industrial Credit And Investment Corporation Of India, <span>{statename}</span> list of IFSC Codes here.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DistrictDetailRoute
