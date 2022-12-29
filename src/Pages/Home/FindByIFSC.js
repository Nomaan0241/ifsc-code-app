import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoadingState } from '../../Middlewares/ReduxStore/ToggleStateSlice'
import { setIfscFetchedDetails } from '../../Middlewares/ReduxStore/IfscFetchDetails'
import { setIFSCSearchDetailInfo } from '../../Middlewares/ReduxStore/IfscSearchDetailInfo'
import axiosFetchBankDataInstance from '../../Middlewares/AxiosInstance/AxiosInstance';
import SearchImg from '../../Assets/Images/Icons/search.png'
import HeaderTags from '../../Components/HeaderTags'
import '../../Assets/Styles/FindByCodes.css'

function FindByIFSC() {
    const [ifscValue, setIfscValue] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function getIFSCData(e) {
        e.preventDefault();
        dispatch(setLoadingState(true));
        axiosFetchBankDataInstance({
            url: "api/ifsc",
            data: {
                IFSC: ifscValue.toUpperCase(),
            },
        }).then((res) => {
            console.log(res.data);
            dispatch(setIFSCSearchDetailInfo({ key: 'ifsc', value: ifscValue }))
            dispatch(setIfscFetchedDetails({ key: 'ifsc', value: res.data.data }))
            navigate(`/ifsc/${ifscValue}`);
        }).catch((err) => {
            alert(err.message);
        }).finally(() => {
            dispatch(setLoadingState(false));
        });
        setIfscValue('');
    }

    return (
        <>
            <HeaderTags
                title={`${process.env.REACT_APP_NAME} | Find By IFSC`}
                description={`Find by IFSC Description`}
            />
            <h1 className='sectionHeaderTitle'>Find by <span>IFSC</span></h1>
            <div className="pageContainer">
                <div className="shadowBoxContainer findByCodeContainer">
                    <div id='findByCodeImgContainer' className="findByCodeSubContainer">
                        <img src={SearchImg} alt="searching" />
                    </div>
                    <div id='findByIfscCodeContainer' className="findByCodeSubContainer">
                        <h1>Find Bank Details</h1>
                        <p>Find your bank details by IFSC Code</p>
                        <form onSubmit={(e) => getIFSCData(e)} className='findByCodeSearchForm' autoComplete="off">
                            <input type="text" pattern="^[A-Za-z]{4}0[A-Za-z0-9]{6}$" onChange={(e) => setIfscValue(e.target.value)} value={ifscValue} placeholder='Search your IFSC code here' title="Enter correct IFSC Code." maxLength={11} required className='findByCodeFormInputField' />
                            <button type="submit" id='findByCodeFormBtn' className='findByCodeFormInputField'>Submit</button>
                        </form>
                    </div>
                </div>
                <section className='infoBox'>
                    <h1 className='infoHeading'>What is <span>IFSC Code?</span></h1>
                    <p>IFSC code is used by electronic payment system applications such as real-time gross settlement (RTGS), NEFT and Centralized Funds Management System (CFMS). This code is mandatory for fund transfers from one bank account to another. Every bank branch will have a unique code and no two branches (even of the same bank) will ever be the same.</p>
                </section>
                <section className='infoBox'>
                    <h1 className='infoHeading'>Where to find <span>IFSC Code?</span></h1>
                    <p>You can find the IFSC code on your chequebook, passbook. You can also find it on RBI’s official website. You can also directly call the bank branch and ask for the code. Many third-party websites are also providing IFSC code information.</p>
                </section>
            </div>
        </>
    )
}

export default FindByIFSC
