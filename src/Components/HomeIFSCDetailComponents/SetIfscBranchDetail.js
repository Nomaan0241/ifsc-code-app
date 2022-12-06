import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingColumns, faCaretDown, faFlag, faCity, faIndianRupeeSign, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { setIFSCSearchDetailInfo } from '../../Middlewares/ReduxStore/IfscSearchDetailInfo'
import '../../Assets/Styles/BankDetailSearchForm.css';

function SetIfscBranchDetail() {
  const { bank: { bankvalue, bankname: bankName }, state: { statevalue, statename: stateName }, district: { districtname: districtName } } = useSelector((state) => state.ifscSearchDetailInfo);
  const branchList = useSelector((state) => state.ifscFetchDetails.branch);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const branchName = useRef('Select Branch');

  function setBranchNameValue(details) {
    branchName.current = details.branchname;
    dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: details }));
    navigate(`${details.branchvalue}`);
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
        <div className={`bankDetailSelectContainer ${stateName ? 'successBorder' : 'errorBorder'}`}>
          <FontAwesomeIcon icon={faFlag} className={`bankDetailSelectIcon`} />
          <p>{stateName || 'Some Error Occur'}</p>
          <FontAwesomeIcon icon={faArrowsRotate} className={`bankDetailSelectDropDownIcon refreshBtnColor`} onClick={() => navigate(`/bank/${bankvalue}`)} />
        </div>
        <div className={`bankDetailSelectContainer ${districtName ? 'successBorder' : 'errorBorder'}`}>
          <FontAwesomeIcon icon={faCity} className={`bankDetailSelectIcon`} />
          <p>{districtName || 'Some Error Occur'}</p>
          <FontAwesomeIcon icon={faArrowsRotate} className={`bankDetailSelectDropDownIcon refreshBtnColor`} onClick={() => navigate(`/bank/${bankvalue}/${statevalue}`)} />
        </div>
        <div className="bankDetailSelectContainer" onClick={() => setShow(!show)}>
          <FontAwesomeIcon icon={faIndianRupeeSign} className={`bankDetailSelectIcon`} />
          <p>{branchName.current}</p>
          <FontAwesomeIcon icon={faCaretDown} className={`bankDetailSelectDropDownIcon ${show && 'opened'}`} />
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
