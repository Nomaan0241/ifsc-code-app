import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setIFSCSearchDetailInfo } from '../Middlewares/ReduxStore/IfscSearchDetailInfo'
import '../Assets/Styles/BankDetailSearchForm.css';

function FindIFSCSetStateComponent() {
  const bankList = useSelector((state)=> state.ifscFetchDetails.bank)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const bankName = useRef('Select Bank');

  function setBankNameValue(details) {
    bankName.current = details.bankname;
    dispatch(setIFSCSearchDetailInfo({key:'bank', value: details}))
    navigate(`bank/${details.bankvalue}`);
  }

  return (
    <div id='bankDetailSearchContainer'>
      <h1>IFSC Code <span>Finder</span></h1>
      <div id='bankDetailFormContainer'>
        <div className="bankDetailSelectContainer" onClick={() => setShow(!show)}>
          <i className="fa-sharp fa-solid fa-building-columns bankDetailSelectIcon"></i>
          <p>{bankName.current}</p>
          <i className={`fa-solid fa-caret-down bankDetailSelectDropDownIcon ${show && 'opened'}`}></i>
          {show && <div className="bankDetailOptionContainer">
            {bankList.map((details) => {
              return (
                <div key={details.bankvalue} onClick={() => setBankNameValue(details)} className='bankDetailOptionSelector'>{details.bankname}</div>
              );
            })}
          </div>
          }
        </div>
        <div className="bankDetailSelectContainer">
          <i className="fa-sharp fa-solid fa-flag bankDetailSelectIcon"></i>
          <p>Select State</p>
          <i className="fa-solid fa-caret-down bankDetailSelectDropDownIcon"></i>
        </div>
        <div className="bankDetailSelectContainer">
          <i className="fa-sharp fa-solid fa-city bankDetailSelectIcon"></i>
          <p>Select District</p>
          <i className="fa-solid fa-caret-down bankDetailSelectDropDownIcon"></i>
        </div>
        <div className="bankDetailSelectContainer">
          <i className="fa-sharp fa-solid fa-indian-rupee-sign bankDetailSelectIcon"></i>
          <p>Select Branch</p>
          <i className="fa-solid fa-caret-down bankDetailSelectDropDownIcon"></i>
        </div>
      </div>
    </div>
  )
}

export default FindIFSCSetStateComponent
