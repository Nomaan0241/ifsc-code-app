import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoadingState } from '../../Middlewares/ReduxStore/ToggleStateSlice'
import { setIfscFetchedDetails } from '../../Middlewares/ReduxStore/IfscFetchDetails'
import { setIFSCSearchDetailInfo } from '../../Middlewares/ReduxStore/IfscSearchDetailInfo'
import axiosFetchBankDataInstance from '../../Middlewares/AxiosInstance/AxiosInstance';
import HeaderTags from '../../Components/HeaderTags'
import SearchImg from '../../Assets/Images/Icons/search2.png'
import '../../Assets/Styles/FindByCodes.css'

function FindByMICR() {
    const [micrValue, setMicrValue] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function getMICRData(e) {
        e.preventDefault();
        dispatch(setLoadingState(true));
        axiosFetchBankDataInstance({
            url: "api/micr",
            data: {
                MICR: micrValue,
            },
        }).then((res) => {
            console.log(res.data);
            dispatch(setIFSCSearchDetailInfo({ key: 'micr', value: micrValue }))
            dispatch(setIfscFetchedDetails({ key: 'micr', value: res.data.data }))
            navigate(`/micr/${micrValue}`);
        }).catch((err) => {
            alert(err.message);
        }).finally(() => {
            dispatch(setLoadingState(false));
        });
        setMicrValue('');
    }

    return (
        <>
            <HeaderTags
                title={`${process.env.REACT_APP_NAME} | Find By MICR`}
                description={`Find by MICR Description`}
            />
            <h1 className='sectionHeaderTitle'>Find by <span>MICR</span></h1>
            <div className="pageContainer">
                <div className="shadowBoxContainer findByCodeContainer">
                    <div id='findByCodeImgContainer' className="findByCodeSubContainer">
                        <img src={SearchImg} alt="searching" />
                    </div>
                    <div id='findByIfscCodeContainer' className="findByCodeSubContainer">
                        <h1>Find Bank Details</h1>
                        <p>Find your bank details by MICR Code</p>
                        <form onSubmit={(e) => getMICRData(e)} className='findByCodeSearchForm' autoComplete="off">
                            <input type="text" placeholder='Search your MICR code here' className='findByCodeFormInputField' pattern="^[0-9]{9}$" onChange={(e) => setMicrValue(e.target.value)} value={micrValue} title="Enter correct IFSC Code." maxLength={9} required />
                            <button type="submit" id='findByCodeFormBtn' className='findByCodeFormInputField'>Submit</button>
                        </form>
                    </div>
                </div>
                <section className='infoBox'>
                    <h1 className='infoHeading'>What is <span>MICR Code?</span></h1>
                    <p>MICR code is a code printed on cheques using MICR (Magnetic Ink Character Recognition technology). This enables identification of the cheques and which in turns means faster processing. An MICR code is a 9-digit code that uniquely identifies the bank and branch participating in an Electronic Clearing System (ECS).</p>
                </section>
                <section className='infoBox'>
                    <h1 className='infoHeading'>Where to find <span>MICR Code?</span></h1>
                    <p>You can find the IFSC code on your chequebook, passbook. You can also find it on RBI’s official website. You can also directly call the bank branch and ask for the code. Many third-party websites are also providing MICR code information.</p>
                </section>
            </div>
        </>
    )
}

export default FindByMICR
