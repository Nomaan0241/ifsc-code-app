
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIFSCSearchDetailInfo } from '../Middlewares/ReduxStore/IfscSearchDetailInfo'
import { setIfscFetchedDetails } from '../Middlewares/ReduxStore/IfscFetchDetails'
import { setNavToggle } from '../Middlewares/ReduxStore/NavToggleSlice'

function IfscSearchBox() {
    const [ifscValue, setIfscValue] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function getIFSCData(e) {
        e.preventDefault();
        axios({
            method: 'GET',
            url: `https://ifsc.razorpay.com/${ifscValue}`
        }).then((res) => {
            // console.log(res.data);
            dispatch(setIFSCSearchDetailInfo({ key: 'ifsc', value: ifscValue }))
            dispatch(setIfscFetchedDetails({ key: 'ifsc', value: res.data }))
            dispatch(setNavToggle())
            navigate(`/ifsc/${ifscValue}`)
        }).catch((err) => {
            alert(err.message);
        });

        setIfscValue('');
    }

    return (
        <>
            <form onSubmit={(e) => getIFSCData(e)} method='get' className='ifscSearchBoxContainer'>
                <input type="text" name="ifscInput" onChange={(e) => setIfscValue(e.target.value)} value={ifscValue} id="ifscSearchBox" placeholder='Search IFSC Code' />
                <button id='ifscSearchBtn'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </>
    )
}

export default IfscSearchBox