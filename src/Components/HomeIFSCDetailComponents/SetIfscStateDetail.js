import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faCaretDown, faFlag, faCity, faIndianRupeeSign, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { setIFSCSearchDetailInfo } from '../../Middlewares/ReduxStore/IfscSearchDetailInfo';
import '../../Assets/Styles/BankDetailSearchForm.css';

function FindIFSCSetStateComponent() {
  const { bank: { bankname: bankName } } = useSelector((state) => state.ifscSearchDetailInfo);
  const stateList = useSelector((state) => state.ifscFetchDetails.state)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const stateName = useRef('Select State');

  function setStateNameValue(details) {
    stateName.current = details.stateName;
    dispatch(setIFSCSearchDetailInfo({ key: 'state', value: details }))
    navigate(`${details.statevalue}`);
  }

  return (
    <div id='bankDetailSearchContainer'>
      <h1>IFSC Code <span>Finder</span></h1>
      <div id='bankDetailFormContainer'>
        <div className={`bankDetailSelectContainer ${bankName ? 'successBorder' : 'errorBorder'}`}>
          <FontAwesomeIcon icon={faBuildingColumns} className={`bankDetailSelectIcon`} />
          <p>{bankName || 'Some Error Occur'}</p>
          <FontAwesomeIcon icon={faArrowsRotate} className={`bankDetailSelectDropDownIcon refreshBtnColor`} onClick={() => navigate(`/`)} />
        </div>

        <div className="bankDetailSelectContainer" onClick={() => setShow(!show)}>
          <FontAwesomeIcon icon={faFlag} className={`bankDetailSelectIcon`} />
          <p>{stateName.current}</p>
          <FontAwesomeIcon icon={faCaretDown} className={`bankDetailSelectDropDownIcon ${show && 'opened'}`} />
          {show && <div className="bankDetailOptionContainer">
            {stateList.map((details) => {
              return (
                <div key={details.statevalue} onClick={() => setStateNameValue(details)} className='bankDetailOptionSelector'>{details.statename}</div>
              );
            })}
          </div>
          }
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
    </div >

  )
}

export default FindIFSCSetStateComponent
