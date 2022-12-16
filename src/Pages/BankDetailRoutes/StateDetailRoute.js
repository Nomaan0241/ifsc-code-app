import React from 'react'
import Home from '../Home/Home'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { setLoadingState } from '../../Middlewares/ReduxStore/ToggleStateSlice';
import { setIfscFetchedDetails } from '../../Middlewares/ReduxStore/IfscFetchDetails';
import { setIFSCSearchDetailInfo } from '../../Middlewares/ReduxStore/IfscSearchDetailInfo';
import { nameConverter } from '../../Utils/RoutingFormats';


function StateDetailRoute() {
  const { bank: { bankname } } = useSelector((state) => state.ifscSearchDetailInfo);
  const { bankNameSlug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (bankNameSlug && !bankname) {
      dispatch(setLoadingState(true));
      axios({
        method: "post",
        url: "https://findbankifsccode.onrender.com/api/bank-name/get-states",
        data: {
          BANK: nameConverter(bankNameSlug),
        },
      }).then((res) => {
        console.log(res.data, 'State Page');
        dispatch(setIFSCSearchDetailInfo({ key: 'bank', value: { bankname: res.data.requestBody.BANK } }));
        dispatch(setIfscFetchedDetails({ key: 'state', value: res.data.data }))
      }).catch((err) => {
        console.log(err);
        alert(err.message);
        navigate(`/`);
      }).finally(() => {
        dispatch(setLoadingState(false));
      });
    }
  }, [bankname, bankNameSlug, dispatch, navigate])

  return (
    <>
      <Home />
      <div className="pageContainer">
        <div className="descriptionSectionContainer">
          <section className="descriptionContainer">
            <h1 className='descriptionHeading'>IFSC Code for <span>{bankname}</span></h1>
            <p className='descriptionPara'><span>{bankname}</span> IFSC code can be used by both the National Electronic Fund Transfer and Real Time Gross Settlement finance transfer systems. <span>{bankname}</span> NEFT, RTGS and IMPS codes are provided by RBI. NEFT transactions are settled in batches while RTGS transactions are settled individually. IMPS presents an instant 24X7, electronic fund transfer. IFSC Code is an 11 character code for identifying bank branches participating in online fund transfers. This code is unique for each branch. Please NOTE that not all branches of a bank provide net banking facility.</p>
          </section>
          <section className="descriptionContainer">
            <h1 className='descriptionHeading'>How to Find <span>{bankname}</span> IFSC Code?</h1>
            <p className='descriptionPara'>The table alongside provides the <span>{bankname}</span> IFSC code list. One can use this IFSC code finder to find IFSC Code for <span>{bankname}</span> for NEFT or RTGS or IMPS codes before using them. You can find IFSC codes for <span>{bankname}</span> branches in India. Narrow down your search for IFSC Codes either by selecting any particular state from the drop down list or by selecting the state in the table on the right side.</p>
          </section>
        </div>
      </div>
    </>
  )
}

export default StateDetailRoute
