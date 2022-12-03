import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setIFSCSearchDetailInfo } from '../Middlewares/ReduxStore/IfscSearchDetailInfo'
import '../Assets/Styles/BankDetailSearchForm.css';

function FindIFSCSetStateComponent() {
  const bankName = useSelector((state) => state.ifscSearchDetailInfo.bank.bankname);
  const stateList = useSelector((state) => state.ifscFetchDetails.state)
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
        <div className="bankDetailSelectContainer">
          <i className="fa-sharp fa-solid fa-building-columns bankDetailSelectIcon"></i>
          <p>{bankName || 'Some Error Occur'}</p>
          <i className="fa-solid fa-caret-down bankDetailSelectDropDownIcon"></i>
        </div>

        <div className="bankDetailSelectContainer" onClick={() => setShow(!show)}>
          <i className="fa-sharp fa-solid fa-flag bankDetailSelectIcon"></i>
          <p>{stateName.current}</p>
          <i className="fa-solid fa-caret-down bankDetailSelectDropDownIcon"></i>
          {show && <div className="bankDetailOptionContainer">
            {stateList.map((details) => {
              return (
                <div key={details.statevalue} onClick={() => setStateNameValue(details)} className='bankDetailOptionSelector'>{details.statename}</div>
              );
            })}
          </div>
          }
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
