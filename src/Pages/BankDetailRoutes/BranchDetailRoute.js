import React, { useEffect } from 'react'
import Home from '../Home/Home'
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setLoadingState } from '../../Middlewares/ReduxStore/ToggleStateSlice';
import { setIfscFetchedDetails } from '../../Middlewares/ReduxStore/IfscFetchDetails';
import { setIFSCSearchDetailInfo } from '../../Middlewares/ReduxStore/IfscSearchDetailInfo';
import { nameConverter } from '../../Utils/RoutingFormats';
import axiosFetchBankDataInstance from '../../Middlewares/AxiosInstance/AxiosInstance';

function BranchDetailRoute() {
  const { bank: { bankname }, state: { statename }, district: { districtname } } = useSelector((state) => state.ifscSearchDetailInfo);
  const { bankNameSlug, stateNameSlug, districtNameSlug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const capsBankName = nameConverter(bankNameSlug);
  const capsStateName = nameConverter(stateNameSlug);
  const capsDistrictName = nameConverter(districtNameSlug);

  useEffect(() => {
    if (bankNameSlug && stateNameSlug && districtNameSlug && !districtname) {
      dispatch(setLoadingState(true));

      axiosFetchBankDataInstance({
        url: "api/bank-name/state/city/branch",
        data: {
          BANK: capsBankName,
          STATE: capsStateName,
          CITY: capsDistrictName
        },
      }).then((res) => {
        console.log(res.data, 'Branch Page');
        dispatch(setIFSCSearchDetailInfo({ key: 'bank', value: { bankname: res.data.requestBody.BANK } }));
        dispatch(setIFSCSearchDetailInfo({ key: 'state', value: { statename: res.data.requestBody.STATE } }));
        dispatch(setIFSCSearchDetailInfo({ key: 'district', value: { districtname: res.data.requestBody.CITY } }));
        dispatch(setIfscFetchedDetails({ key: 'branch', value: res.data.data }))
      }).catch((err) => {
        console.log(err);
        alert(err.message);
        navigate(`/`);
      }).finally(() => {
        dispatch(setLoadingState(false));
      });
    }
  }, [districtname, bankNameSlug, stateNameSlug, districtNameSlug, capsBankName, capsStateName, capsDistrictName, dispatch, navigate])

  return (
    <>
      <Helmet>
        <title>{`${capsBankName}, ${capsStateName}, ${capsDistrictName} All Branch Addresses, Phone, IFSC code, MICR code`} </title>
        <meta name="description" content={`${capsBankName}, ${capsStateName}, ${capsDistrictName} All Branch Addresses, Phone, IFSC code, MICR code, Find IFSC, MICR Codes, Address, All Bank Branches in India, for NEFT, RTGS, ECS Transactions`} />
      </Helmet>
      <Home />
      <div className="pageContainer">
        <div className="descriptionSectionContainer">
          <div className="descriptionContainer">
            <h1 className='descriptionHeading'><span>{bankname}</span> IFSC Code in <span>{districtname}</span></h1>
            <p className='descriptionPara'><span>{bankname}</span> IFSC code in <span>{districtname}</span> in <span>{statename}</span> state is used in internet banking for transferring funds between any two bank branches. These IFSC codes for <span>{bankname}</span> <span>{districtname}</span> are used to identify the branches participating in online transactions via RTGS, NEFT and IMPS systems. Therefore, each branch of <span>{bankname}</span> in <span>{districtname}</span> supporting net banking has its unique IFSC code. Industrial Credit And Investment Corporation Of India IFSC code list in <span>{districtname}</span> is provided by RBI. NOTE that all branches of a bank cannot provide online fund transfer systems, only those approved by RBI can provide such facility.</p>
          </div>
          <div className="descriptionContainer">
            <h1 className='descriptionHeading'>How to Find <span>{bankname}</span> IFSC Code in <span>{districtname}</span> ?</h1>
            <p className='descriptionPara'><span>{bankname}</span>, <span>{statename}</span>, <span>{districtname}</span> IFSC codes are given in the table alongside. Details like address and contact numbers of branches of <span>{bankname}</span> with IFSC code in <span>{districtname}</span> are also provided. Simplify your search either by selecting any particular city from the drop down list or by selecting the link for city in the table on the right side. You can find IFSC codes for all Industrial Credit And Investment Corporation Of India <span>{districtname}</span> branches here.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default BranchDetailRoute
