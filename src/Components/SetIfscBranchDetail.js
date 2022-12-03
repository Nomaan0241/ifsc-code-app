import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setIFSCSearchDetailInfo } from '../Middlewares/ReduxStore/IfscSearchDetailInfo'
import '../Assets/Styles/BankDetailSearchForm.css';

function SetIfscBranchDetail() {
  const bankName = useSelector((state) => state.ifscSearchDetailInfo.bank.bankname);
  const stateName = useSelector((state) => state.ifscSearchDetailInfo.state.statename);
  const districtName = useSelector((state) => state.ifscSearchDetailInfo.district.districtname);
  const settedBranchName = useSelector((state) => state.ifscSearchDetailInfo.branch?.branchname);
  const branchList = useSelector((state) => state.ifscFetchDetails.branch);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const branchName = useRef('Select Branch');

  function setBranchNameValue(details) {
    branchName.current = details.branchname;
    dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: details }));
    navigate(`/showfulldetails`);
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
        <div className="bankDetailSelectContainer" >
          <i className="fa-sharp fa-solid fa-city bankDetailSelectIcon"></i>
          <p>{districtName || 'Some Error Occur'}</p>
          <i className="fa-solid fa-caret-down bankDetailSelectDropDownIcon"></i>
        </div>
        <div className="bankDetailSelectContainer" onClick={() => setShow(!show)}>
          <i className="fa-sharp fa-solid fa-indian-rupee-sign bankDetailSelectIcon"></i>
          <p>{settedBranchName || branchName.current}</p>
          <i className="fa-solid fa-caret-down bankDetailSelectDropDownIcon"></i>
          {show && <div className="bankDetailOptionContainer">
            {branchList.map((details) => {
              return (
                <div key={details.branchvalue} onClick={() => setBranchNameValue(details)} className='bankDetailOptionSelector'>{details.branchname}</div>
              );
            })}
          </div>
          }
        </div>
      </div>
    </div>

  )
}

export default SetIfscBranchDetail
