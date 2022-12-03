import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Assets/Styles/BankDetailSearchForm.css';

function BankDetailSearchForm() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const bankName = useRef('Select Bank');
  let optionDetail = [
    { bankvalue: 'punjab-national-bank', bankname: 'Punjab National Bank' },
    { bankvalue: 'axis-bank', bankname: 'Axis Bank' },
    { bankvalue: 'state-bank-of-india', bankname: 'State Bank of India' },
  ]

  function setBankNameValue(details) {
    bankName.current = details.bankname;
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
            {optionDetail.map((details) => {
              return (

                <div onClick={() => setBankNameValue(details)} className='bankDetailOptionSelector'>{details.bankname}</div>

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

export default BankDetailSearchForm
