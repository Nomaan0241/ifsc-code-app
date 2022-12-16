import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { capitalizeConverter, nameConverter, objectToIfscDataCapitalizeConverter } from '../Utils/RoutingFormats'
import { useNavigate, useParams } from 'react-router-dom';
import { setIfscFetchedDetails } from '../Middlewares/ReduxStore/IfscFetchDetails';
import { setLoadingState } from '../Middlewares/ReduxStore/ToggleStateSlice';
import { setIFSCSearchDetailInfo } from '../Middlewares/ReduxStore/IfscSearchDetailInfo';

function IfscFullDetail() {
    const { IFSC, MICR, BANK, BRANCH, ADDRESS, STATE, CITY, DISTRICT, CONTACT } = useSelector((state) => state.ifscFetchDetails.bankDetails);
    const { bankNameSlug, stateNameSlug, districtNameSlug, branchNameSlug } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (bankNameSlug && stateNameSlug && districtNameSlug && branchNameSlug) {
            dispatch(setLoadingState(true));
            axios({
                method: "post",
                url: "https://findbankifsccode.onrender.com/api/bank-name/state/city/branch/bank",
                data: {
                    BANK: nameConverter(bankNameSlug),
                    STATE: nameConverter(stateNameSlug),
                    CITY: nameConverter(districtNameSlug),
                    BRANCH: nameConverter(branchNameSlug),
                },
            }).then((res) => {
                console.log(res.data);
                const { requestBody: { BANK, STATE, CITY, BRANCH }, data } = res.data;
                dispatch(setIFSCSearchDetailInfo({ key: 'bank', value: { bankname: capitalizeConverter(BANK) } }));
                dispatch(setIFSCSearchDetailInfo({ key: 'state', value: { statename: capitalizeConverter(STATE) } }));
                dispatch(setIFSCSearchDetailInfo({ key: 'district', value: { districtname: capitalizeConverter(CITY) } }));
                dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: { branchname: capitalizeConverter(BRANCH) } }));
                dispatch(setIfscFetchedDetails({ key: 'bankDetails', value: objectToIfscDataCapitalizeConverter(data) }))
            }).catch((err) => {
                alert(err.message);
                navigate('/');
            }).finally(() => {
                dispatch(setLoadingState(false));
            });
        }
    }, [bankNameSlug, stateNameSlug, districtNameSlug, branchNameSlug, dispatch, navigate])


    return (
        <>
            <h1 className='sectionHeaderTitle'>IFSC <span>Details</span></h1>
            <div className="pageContainer">
                <div className="infoTable">
                    <h1 className="infoTableHeading">{BANK} Bank Details</h1>
                    <div className='infoTableRow'>
                        <div className='infoTableCol fieldNameCol'>Bank:</div>
                        <div className='infoTableCol dataCol'>{BANK || 'No Data Available'}</div>
                    </div>
                    <div className='infoTableRow'>
                        <div className='infoTableCol fieldNameCol'>Branch:</div>
                        <div className='infoTableCol dataCol'>{BRANCH || 'No Data Available'}</div>
                    </div>
                    <div className='infoTableRow'>
                        <div className='infoTableCol fieldNameCol'>IFSC Code:</div>
                        <div className='infoTableCol dataCol'>{IFSC || 'No Data Available'}</div>
                    </div>
                    <div className='infoTableRow'>
                        <div className='infoTableCol fieldNameCol'>MICR Code:</div>
                        <div className='infoTableCol dataCol'>{MICR || 'No Data Available'}</div>
                    </div>
                    <div className='infoTableRow'>
                        <div className='infoTableCol fieldNameCol'>Contact:</div>
                        <div className='infoTableCol dataCol'>{CONTACT || 'No Data Available'}</div>
                    </div>
                    <div className='infoTableRow'>
                        <div className='infoTableCol fieldNameCol'>Address:</div>
                        <div className='infoTableCol dataCol'>{ADDRESS || 'No Data Available'}</div>
                    </div>
                    <div className='infoTableRow'>
                        <div className='infoTableCol fieldNameCol'>City:</div>
                        <div className='infoTableCol dataCol'>{CITY || 'No Data Available'}</div>
                    </div>
                    <div className='infoTableRow'>
                        <div className='infoTableCol fieldNameCol'>District:</div>
                        <div className='infoTableCol dataCol'>{DISTRICT || 'No Data Available'}</div>
                    </div>
                    <div className='infoTableRow'>
                        <div className='infoTableCol fieldNameCol'>State:</div>
                        <div className='infoTableCol dataCol'>{STATE || 'No Data Available'}</div>
                    </div>
                </div>
                <section className="descriptionContainer">
                    <h1 className='descriptionHeading'><span>{IFSC}</span> IFSC Code Details</h1>
                    <p className='descriptionPara'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ea quam deleniti aliquid, enim ab cupiditate possimus! Nisi cumque delectus a ab sint asperiores assumenda, obcaecati nemo. Culpa a molestias quisquam autem at praesentium porro aspernatur consequuntur ipsam reprehenderit? Laborum, tempore ad nihil quae minus pariatur consequuntur sed, repellat placeat magnam repellendus commodi corrupti. Voluptatum officia eveniet </p>
                </section>
                <section className="descriptionContainer">
                    <h1 className='descriptionHeading'>What is <span>{BRANCH}</span> Branch IFSC Code?</h1>
                    <p className='descriptionPara'>The <span>{BRANCH}</span> Branch IFSC code is <span>{IFSC}</span>.
                        The IFSC Code stands for Indian Financial System Code. It is an alphanumeric code that facilitates electronic funds transfer in India while using NEFT, RTGS, IMPS, or UPI.

                        In the IFSC Code <span>{IFSC}</span>, <span>{IFSC?.slice(0, 4) || 'Bank Code'}</span> represents <span>{BANK}</span> and <span>{IFSC?.slice(-6, 11) || 'Branch Code'}</span> is the branch code of <span>{BANK}</span>, <span>{BRANCH}</span>.
                    </p>
                </section>
            </div>
        </>
    )
}

export default IfscFullDetail
