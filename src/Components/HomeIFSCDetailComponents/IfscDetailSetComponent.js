import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingColumns, faCaretDown, faFlag, faCity, faIndianRupeeSign, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { setIFSCSearchDetailInfo } from '../../Middlewares/ReduxStore/IfscSearchDetailInfo'
import '../../Assets/Styles/BankDetailSearchForm.css';

function IfscDetailSetComponent() {
  const { bank: bankList, state: stateList, district: districtList, branch: branchList } = useSelector((state) => state.ifscFetchDetails);
  const { bank, state, district } = useSelector((state) => state.ifscSearchDetailInfo);
  const { bank: { bankname }, state: { statename }, district: { districtname }, branch: { branchname } } = useSelector((state) => state.ifscSearchDetailInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showBankOption, setShowBankOption] = useState(false);
  const [showStateOption, setShowStateOption] = useState(false);
  const [showDistrictOption, setShowDistrictOption] = useState(false);
  const [showBranchOption, setShowBranchOption] = useState(false);

  function setBankNameValue(details) {
    dispatch(setIFSCSearchDetailInfo({ key: 'bank', value: details }));
    navigate(`bank/${details.bankvalue}`);
  }

  function setStateNameValue(details) {
    dispatch(setIFSCSearchDetailInfo({ key: 'state', value: details }))
    navigate(`${details.statevalue}`);
  }

  function setDistrictNameValue(details) {
    dispatch(setIFSCSearchDetailInfo({ key: 'district', value: details }));
    navigate(`${details.districtvalue}`);
  }

  function setBranchNameValue(details) {
    dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: details }));
    navigate(`${details.branchvalue}`);
  }

  function navToBankOption() {
    if (bank) {
      dispatch(setIFSCSearchDetailInfo({ key: 'bank', value: '' }))
      dispatch(setIFSCSearchDetailInfo({ key: 'state', value: '' }))
      dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: '' }))
      dispatch(setIFSCSearchDetailInfo({ key: 'district', value: '' }))
      navigate(`/`);
    } 
  }

  function navToStateOption() {
    if (state) {
      dispatch(setIFSCSearchDetailInfo({ key: 'state', value: '' }))
      dispatch(setIFSCSearchDetailInfo({ key: 'district', value: '' }))
      dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: '' }))
      navigate(`/bank/${bank.bankvalue}`);
    }
  }
  
  function navToDistrictOption() {
    if (district) {
      dispatch(setIFSCSearchDetailInfo({ key: 'district', value: '' }))
      dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: '' }))
      navigate(`/bank/${bank.bankvalue}/${state.statename}`);
    }
  }

  return (
    <div id='bankDetailSearchContainer'>
      <h1>IFSC Code <span>Finder</span></h1>
      <div id='bankDetailFormContainer'>
        {/* Bank Section */}
        <div className={`bankDetailSelectContainer ${bank && 'successBorder'}`} onClick={() => setShowBankOption(!showBankOption)}>
          <FontAwesomeIcon icon={faBuildingColumns} className={`bankDetailSelectIcon`} />
          <p>{bankname || 'Select Bank'}</p>
          <FontAwesomeIcon icon={(bank) ? faArrowsRotate : faCaretDown} className={`bankDetailSelectDropDownIcon ${showBankOption && !bank && 'opened'} ${bank && 'refreshBtnColor'}`} onClick={() => navToBankOption()} />
          {showBankOption && !bank && <div className="bankDetailOptionContainer">
            {bankList.map((details) => {
              return (
                <div key={details.bankvalue} onClick={() => setBankNameValue(details)} className='bankDetailOptionSelector'>{details.bankname}</div>
              );
            })}
          </div>}
        </div>
        {/* State Section */}
        <div className={`bankDetailSelectContainer ${(!bank) ? 'disabledField' : ''} ${state && 'successBorder'}`} onClick={() => setShowStateOption(!showStateOption)}>
          <FontAwesomeIcon icon={faFlag} className={`bankDetailSelectIcon`} />
          <p>{statename || 'Select State'}</p>
          <FontAwesomeIcon icon={(state) ? faArrowsRotate : faCaretDown} className={`bankDetailSelectDropDownIcon ${(showStateOption && !state && bank) && 'opened'} ${state && 'refreshBtnColor'}`} onClick={() => navToStateOption()} />
          {(showStateOption && !state && bank) && <div className="bankDetailOptionContainer">
            {stateList.map((details) => {
              return (
                <div key={details.statevalue} onClick={() => setStateNameValue(details)} className='bankDetailOptionSelector'>{details.statename}</div>
              );
            })}
          </div>
          }
        </div>
        {/* District Section */}
        <div className={`bankDetailSelectContainer ${(!state) ? 'disabledField' : ''} ${district && 'successBorder'}`} onClick={() => setShowDistrictOption(!showDistrictOption)}>
          <FontAwesomeIcon icon={faCity} className={`bankDetailSelectIcon`} />
          <p>{districtname || 'Select District'}</p>
          <FontAwesomeIcon icon={(district) ? faArrowsRotate : faCaretDown} className={`bankDetailSelectDropDownIcon ${(showDistrictOption && !district && state) && 'opened'} ${district && 'refreshBtnColor'}`} onClick={() => navToDistrictOption()} />
          {(showDistrictOption && !district && state) && <div className="bankDetailOptionContainer">
            {districtList.map((details) => {
              return (
                <div key={details.districtvalue} onClick={() => setDistrictNameValue(details)} className='bankDetailOptionSelector'>{details.districtname}</div>
              );
            })}
          </div>
          }
        </div>
        {/* Branch Section */}
        <div className={`bankDetailSelectContainer ${(!district) ? 'disabledField' : ''}`} onClick={() => setShowBranchOption(!showBranchOption)}>
          <FontAwesomeIcon icon={faIndianRupeeSign} className={`bankDetailSelectIcon`} />
          <p>{branchname || 'Select Branch'}</p>
          <FontAwesomeIcon icon={faCaretDown} className={`bankDetailSelectDropDownIcon ${showBranchOption && district && 'opened'}`} />
          {showBranchOption && district && <div className="bankDetailOptionContainer">
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

export default IfscDetailSetComponent
