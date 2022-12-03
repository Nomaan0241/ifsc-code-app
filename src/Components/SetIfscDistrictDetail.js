import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setIFSCSearchDetailInfo } from '../Middlewares/ReduxStore/IfscSearchDetailInfo'
import '../Assets/Styles/BankDetailSearchForm.css';

function FindIFSCSetDistrictComponent() {
  const bankName = useSelector((state) => state.ifscSearchDetailInfo.bank.bankname);
  const stateName = useSelector((state) => state.ifscSearchDetailInfo.state.statename);
  const districtList = useSelector((state) => state.ifscFetchDetails.district);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const districtName = useRef('Select District');

  function setDistrictNameValue(details) {
    districtName.current = details.districtname;
    dispatch(setIFSCSearchDetailInfo({ key: 'district', value: details }));
    navigate(`${details.districtvalue}`);
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
        <div className="bankDetailSelectContainer">
          <i className="fa-sharp fa-solid fa-flag bankDetailSelectIcon"></i>
          <p>{stateName || 'Some Error Occur'}</p>
          <i className="fa-solid fa-caret-down bankDetailSelectDropDownIcon"></i>
        </div>
        <div className="bankDetailSelectContainer" onClick={() => setShow(!show)}>
          <i className="fa-sharp fa-solid fa-city bankDetailSelectIcon"></i>
          <p>{districtName.current}</p>
          <i className="fa-solid fa-caret-down bankDetailSelectDropDownIcon"></i>
          {show && <div className="bankDetailOptionContainer">
            {districtList.map((details) => {
              return (
                <div key={details.districtvalue} onClick={() => setDistrictNameValue(details)} className='bankDetailOptionSelector'>{details.districtname}</div>
              );
            })}
          </div>
          }
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

export default FindIFSCSetDistrictComponent
