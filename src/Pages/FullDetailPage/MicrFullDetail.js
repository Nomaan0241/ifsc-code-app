import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { setIfscFetchedDetails } from '../../Middlewares/ReduxStore/IfscFetchDetails';
import { setIFSCSearchDetailInfo } from '../../Middlewares/ReduxStore/IfscSearchDetailInfo';
import { setLoadingState } from '../../Middlewares/ReduxStore/ToggleStateSlice';
import axiosFetchBankDataInstance from '../../Middlewares/AxiosInstance/AxiosInstance';
import IfscDetailTable from '../../Components/IfscDetailTable';
import HeaderTags from '../../Components/HeaderTags'

function MicrFullDetail() {
  const { IFSC, MICR, BANK, BRANCH, ADDRESS, STATE, CITY, DISTRICT, } = useSelector((state) => state.ifscFetchDetails.micr);
  const micrDetails = useSelector((state) => state.ifscFetchDetails.micr);
  const dispatch = useDispatch();
  const { micrCodeSlug } = useParams();
  const { micr } = useSelector((state) => state.ifscSearchDetailInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!micr) {
      dispatch(setLoadingState(true));
      axiosFetchBankDataInstance({
        url: "api/ifsc",
        data: {
          IFSC: micrCodeSlug,
        },
      }).then((res) => {
        console.log(res.data);
        dispatch(setIFSCSearchDetailInfo({ key: 'micr', value: micrCodeSlug }))
        dispatch(setIfscFetchedDetails({ key: 'micr', value: res.data.data }))
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
      <HeaderTags
        title={`${micrCodeSlug} MICR Code | All details address, IFSC, MICR, Contact`}
        description={`${micrCodeSlug} MICR Code | All details address, IFSC, MICR, Contact`}
      />
      <h1 className='sectionHeaderTitle'>Bank <span>Details</span></h1>
      <div className="pageContainer">
        <IfscDetailTable details={micrDetails} />
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

export default MicrFullDetail
