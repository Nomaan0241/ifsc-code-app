import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingColumns, faCaretDown, faFlag, faCity, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { setIFSCSearchDetailInfo } from '../../Middlewares/ReduxStore/IfscSearchDetailInfo'
import '../../Assets/Styles/BankDetailSearchForm.css';

function FindIFSCSetStateComponent() {
  const bankList = useSelector((state) => state.ifscFetchDetails.bank)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const bankName = useRef('Select Bank');

  function setBankNameValue(details) {
    bankName.current = details.bankname;
    dispatch(setIFSCSearchDetailInfo({ key: 'bank', value: details }))
    navigate(`bank/${details.bankvalue}`);
  }

  return (
    <div id='bankDetailSearchContainer'>
      <h1>IFSC Code <span>Finder</span></h1>
      <div id='bankDetailFormContainer'>
        <div className="bankDetailSelectContainer" onClick={() => setShow(!show)}>
          <FontAwesomeIcon icon={faBuildingColumns} className={`bankDetailSelectIcon`} />
          <p>{bankName.current}</p>
          <FontAwesomeIcon icon={faCaretDown} className={`bankDetailSelectDropDownIcon ${show && 'opened'}`} />
          {show && <div className="bankDetailOptionContainer">
            {bankList.map((details) => {
              return (
                <div key={details.bankvalue} onClick={() => setBankNameValue(details)} className='bankDetailOptionSelector'>{details.bankname}</div>
              );
            })}
          </div>}
        </div>
        <div className="bankDetailSelectContainer disabledField">
          <FontAwesomeIcon icon={faFlag} className={`bankDetailSelectIcon`} />
          <p>Select State</p>
          <FontAwesomeIcon icon={faCaretDown} className={`bankDetailSelectDropDownIcon`} />
        </div>
        <div className="bankDetailSelectContainer disabledField">
          <FontAwesomeIcon icon={faCity} className={`bankDetailSelectIcon`} />
          <p>Select District</p>
          <FontAwesomeIcon icon={faCaretDown} className={`bankDetailSelectDropDownIcon`} />
        </div>
        <div className="bankDetailSelectContainer disabledField">
          <FontAwesomeIcon icon={faIndianRupeeSign} className={`bankDetailSelectIcon`} />
          <p>Select Branch</p>
          <FontAwesomeIcon icon={faCaretDown} className={`bankDetailSelectDropDownIcon`} />
        </div>
      </div>
    </div>
  )
}

export default FindIFSCSetStateComponent
