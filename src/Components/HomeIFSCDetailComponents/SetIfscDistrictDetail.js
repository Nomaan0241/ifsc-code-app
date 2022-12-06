import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingColumns, faCaretDown, faFlag, faCity, faIndianRupeeSign, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { setIFSCSearchDetailInfo } from '../../Middlewares/ReduxStore/IfscSearchDetailInfo'
import '../../Assets/Styles/BankDetailSearchForm.css';

function FindIFSCSetDistrictComponent() {
  const { bank: { bankvalue, bankname: bankName }, state: { statename: stateName } } = useSelector((state) => state.ifscSearchDetailInfo);
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
        <div className="bankDetailSelectContainer" onClick={() => setShow(!show)}>
          <FontAwesomeIcon icon={faCity} className={`bankDetailSelectIcon`} />
          <p>{districtName.current}</p>
          <FontAwesomeIcon icon={faCaretDown} className={`bankDetailSelectDropDownIcon ${show && 'opened'}`} />
          {show && <div className="bankDetailOptionContainer">
            {districtList.map((details) => {
              return (
                <div key={details.districtvalue} onClick={() => setDistrictNameValue(details)} className='bankDetailOptionSelector'>{details.districtname}</div>
              );
            })}
          </div>
          }
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

export default FindIFSCSetDistrictComponent
