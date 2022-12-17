import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { setIfscFetchedDetails } from '../Middlewares/ReduxStore/IfscFetchDetails';
import { setIFSCSearchDetailInfo } from '../Middlewares/ReduxStore/IfscSearchDetailInfo';
import { setLoadingState } from '../Middlewares/ReduxStore/ToggleStateSlice';
import { objectToIfscDataCapitalizeConverter } from '../Utils/RoutingFormats';
import IfscDetailTable from '../Components/IfscDetailTable';

function BankFullDetail() {
  const { IFSC, MICR, BANK, BRANCH, ADDRESS, STATE, CITY, DISTRICT,} = useSelector((state) => state.ifscFetchDetails.ifsc);
  const ifscDetails = useSelector((state) => state.ifscFetchDetails.ifsc);
  const dispatch = useDispatch();
  const { ifscCodeSlug } = useParams();
  const { ifsc } = useSelector((state) => state.ifscSearchDetailInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ifsc) {
      dispatch(setLoadingState(true));
      axios({
        method: "post",
        url: "https://findbankifsccode.onrender.com/api/ifsc",
        data: {
          IFSC: ifscCodeSlug.toUpperCase(),
        },
      }).then((res) => {
        console.log(res.data);
        dispatch(setIFSCSearchDetailInfo({ key: 'ifsc', value: ifscCodeSlug }))
        dispatch(setIfscFetchedDetails({ key: 'ifsc', value: objectToIfscDataCapitalizeConverter(res.data.data) }))
      }).catch((err) => {
        alert(err.message + 'Navigating to home page');
        navigate('/');
      }).finally(() => {
        dispatch(setLoadingState(false));
      });
    }
  })

  return (
    <>
      <h1 className='sectionHeaderTitle'>Bank <span>Details</span></h1>
      <div className="pageContainer">
        <IfscDetailTable details={ifscDetails} />
        <section className="descriptionContainer">
          <h1 className='descriptionHeading'><span>{IFSC}</span> IFSC Code Details</h1>
          <p className='descriptionPara'>The <span>{BRANCH}</span> Branch IFSC code is <span>{IFSC}</span> and address is <span>{ADDRESS}, {CITY}, {DISTRICT}, {STATE}</span>. The IFSC Code stands for Indian Financial System Code. It is an alphanumeric code that facilitates electronic funds transfer in India while using NEFT, RTGS, IMPS, or UPI. The <span>{BRANCH}</span> Branch MICR code is <span>{MICR}.</span></p>
        </section>
        <section className="descriptionContainer">
          <h1 className='descriptionHeading'>What is <span>{BRANCH}</span> Branch IFSC Code?</h1>
          <p className='descriptionPara'>The <span>{BRANCH}</span> Branch IFSC code is <span>{IFSC}</span>.
            The IFSC Code stands for Indian Financial System Code. It is an alphanumeric code that facilitates electronic funds transfer in India while using NEFT, RTGS, IMPS, or UPI. In the IFSC Code <span>{IFSC}</span>, <span>{IFSC?.slice(0, 4) || 'Bank Code'}</span> represents <span>{BANK}</span> and <span>{IFSC?.slice(-6, 11) || 'Branch Code'}</span> is the branch code of <span>{BANK}</span>, <span>{BRANCH}</span>.
          </p>
        </section>
      </div>
    </>
  )
}

export default BankFullDetail
