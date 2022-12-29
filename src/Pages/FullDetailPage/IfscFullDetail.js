import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { capitalizeConverter, nameConverter } from '../../Utils/RoutingFormats'
import { setIfscFetchedDetails } from '../../Middlewares/ReduxStore/IfscFetchDetails';
import { setLoadingState } from '../../Middlewares/ReduxStore/ToggleStateSlice';
import { setIFSCSearchDetailInfo } from '../../Middlewares/ReduxStore/IfscSearchDetailInfo';
import axiosFetchBankDataInstance from '../../Middlewares/AxiosInstance/AxiosInstance';
import HeaderTags from '../../Components/HeaderTags'
import IfscDetailTable from '../../Components/IfscDetailTable';

function IfscFullDetail() {
    const { IFSC, MICR, BANK, BRANCH, ADDRESS, STATE, CITY, DISTRICT } = useSelector((state) => state.ifscFetchDetails.bankDetails);
    const bankDetails = useSelector((state) => state.ifscFetchDetails.bankDetails);
    const { bankNameSlug, stateNameSlug, districtNameSlug, branchNameSlug } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const capsBankName = nameConverter(bankNameSlug);
    const capsStateName = nameConverter(stateNameSlug);
    const capsDistrictName = nameConverter(districtNameSlug);
    const capsBranchName = nameConverter(branchNameSlug);

    useEffect(() => {
        if (bankNameSlug && stateNameSlug && districtNameSlug && branchNameSlug) {
            console.log(nameConverter(bankNameSlug), nameConverter(stateNameSlug), nameConverter(districtNameSlug), nameConverter(branchNameSlug))
            dispatch(setLoadingState(true));
            axiosFetchBankDataInstance({
                url: "api/bank-name/state/city/branch/bank",
                data: {
                    BANK: capsBankName,
                    STATE: capsStateName,
                    CITY: capsDistrictName,
                    BRANCH: capsBranchName,
                },
            }).then((res) => {
                console.log(res.data);
                const { requestBody: { BANK, STATE, CITY, BRANCH }, data } = res.data;
                dispatch(setIFSCSearchDetailInfo({ key: 'bank', value: { bankname: capitalizeConverter(BANK) } }));
                dispatch(setIFSCSearchDetailInfo({ key: 'state', value: { statename: capitalizeConverter(STATE) } }));
                dispatch(setIFSCSearchDetailInfo({ key: 'district', value: { districtname: capitalizeConverter(CITY) } }));
                dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: { branchname: capitalizeConverter(BRANCH) } }));
                dispatch(setIfscFetchedDetails({ key: 'bankDetails', value: data }))
            }).catch((err) => {
                alert(err.message);
                navigate('/');
            }).finally(() => {
                dispatch(setLoadingState(false));
            });
        }
    }, [bankNameSlug, stateNameSlug, districtNameSlug, branchNameSlug, capsBankName,
        capsStateName, capsDistrictName, capsBranchName, dispatch, navigate])

    return (
        <>
            <HeaderTags
                title={`${capsBankName}, ${capsStateName}, ${capsDistrictName}, ${capsBranchName} | All details address, IFSC, MICR, Contact`}
                description={`${capsBankName}, ${capsStateName}, ${capsDistrictName}, ${capsBranchName} | All details address, IFSC, MICR, Contact`}
            />
            <h1 className='sectionHeaderTitle'>IFSC <span>Details</span></h1>
            <div className="pageContainer">
                <IfscDetailTable details={bankDetails} />
                <section className="descriptionContainer">
                    <h1 className='descriptionHeading'><span>{IFSC}</span> IFSC Code Details</h1>
                    <p className='descriptionPara'>The <span>{BRANCH}</span> Branch IFSC code is <span>{IFSC}</span> and address is <span>{ADDRESS}, {CITY}, {DISTRICT}, {STATE}</span>. The IFSC Code stands for Indian Financial System Code. It is an alphanumeric code that facilitates electronic funds transfer in India while using NEFT, RTGS, IMPS, or UPI. The <span>{BRANCH}</span> Branch MICR code is <span>{MICR}.</span></p>
                </section>
                <section className="descriptionContainer">
                    <h1 className='descriptionHeading'>What is <span>{BRANCH}</span> Branch IFSC Code?</h1>
                    <p className='descriptionPara'>The <span>{BRANCH}</span> Branch IFSC code is <span>{IFSC}</span>. The IFSC Code stands for Indian Financial System Code. It is an alphanumeric code that facilitates electronic funds transfer in India while using NEFT, RTGS, IMPS, or UPI. In the IFSC Code <span>{IFSC}</span>, <span>{IFSC?.slice(0, 4) || 'Bank Code'}</span> represents <span>{BANK}</span> and <span>{IFSC?.slice(-6, 11) || 'Branch Code'}</span> is the branch code of <span>{BANK}</span>, <span>{BRANCH}</span>.
                    </p>
                </section>
            </div>
        </>
    )
}

export default IfscFullDetail
