import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingColumns, faCaretDown, faFlag, faCity, faIndianRupeeSign, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { setIFSCSearchDetailInfo } from '../../Middlewares/ReduxStore/IfscSearchDetailInfo'
import '../../Assets/Styles/BankDetailSearchForm.css';
import { useCallback } from 'react';

function IfscDetailSetComponent() {
  const { bank: bankList, state: stateList, district: districtList, branch: branchList } = useSelector((state) => state.ifscFetchDetails);
  const { bank, state, district, branch } = useSelector((state) => state.ifscSearchDetailInfo);
  const { bankName, stateName, districtName, branchName } = useParams();
  const [showBankOption, setShowBankOption] = useState(false);
  const [showStateOption, setShowStateOption] = useState(false);
  const [showDistrictOption, setShowDistrictOption] = useState(false);
  const [showBranchOption, setShowBranchOption] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(bankName, stateName, districtName, branchName);

  function slugConverter(name) {
    return name.toLowerCase().split(' ').join('-');
  }

  function setBankNameValue(bankValue) {
    dispatch(setIFSCSearchDetailInfo({ key: 'bank', value: { bankname: bankValue, bankslug: slugConverter(bankValue) } }));
    navigate(`bank/${slugConverter(bankValue)}`);
  }

  function setStateNameValue(stateValue) {
    dispatch(setIFSCSearchDetailInfo({ key: 'state', value: { statename: stateValue, stateslug: slugConverter(stateValue) } }))
    navigate(`/bank/${bank.bankslug}/${slugConverter(stateValue)}`);
  }

  function setDistrictNameValue(districtValue) {
    dispatch(setIFSCSearchDetailInfo({ key: 'district', value: { districtname: districtValue, districtvalue: slugConverter(districtValue) } }));
    navigate(`/bank/${bank.bankslug}/${state.stateslug}/${slugConverter(districtValue)}`);
  }

  function setBranchNameValue(branchValue) {
    dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: { branchname: branchValue, branchslug: slugConverter(branchValue) } }));
    navigate(`/bank/${bank.bankslug}/${state.stateslug}/${district.districtvalue}/${slugConverter(branchValue)}`);
  }

  const navToBankOption = useCallback(function () {
    if (bank) {
      dispatch(setIFSCSearchDetailInfo({ key: 'bank', value: '' }))
      dispatch(setIFSCSearchDetailInfo({ key: 'state', value: '' }))
      dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: '' }))
      dispatch(setIFSCSearchDetailInfo({ key: 'district', value: '' }))
      navigate(`/`, { replace: true });
    }
  }, [bank, dispatch, navigate])

  const navToStateOption = useCallback(function () {
    if (state) {
      dispatch(setIFSCSearchDetailInfo({ key: 'state', value: '' }))
      dispatch(setIFSCSearchDetailInfo({ key: 'district', value: '' }))
      dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: '' }))
      navigate(`/bank/${bank.bankslug}`, { replace: true });
    }
  }, [bank, state, dispatch, navigate])

  const navToDistrictOption = useCallback(function () {
    if (district) {
      dispatch(setIFSCSearchDetailInfo({ key: 'district', value: '' }))
      dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: '' }))
      navigate(`/bank/${bank.bankslug}/${state.bankslug}`, { replace: true });
    }
  }, [bank, state, district, dispatch, navigate])

  useEffect(() => {
    if (!bankName) {
      navToBankOption();
    }
    else if (!stateName) {
      navToStateOption();
    }
    else if (!districtName) {
      navToDistrictOption();
    }
  }, [bankName, stateName, districtName, navToBankOption, navToStateOption, navToDistrictOption])

  return (
    <div id='bankDetailSearchContainer'>
      <h1>IFSC Code <span>Finder</span></h1>
      <div id='bankDetailFormContainer'>
        {/* Bank Section */}
        <div className={`bankDetailSelectContainer ${bank && 'successBorder'}`} onClick={() => setShowBankOption(!showBankOption)}>
          <FontAwesomeIcon icon={faBuildingColumns} className={`bankDetailSelectIcon`} />
          <p>{bank.bankname || 'Select Bank'}</p>
          <FontAwesomeIcon icon={(bank) ? faArrowsRotate : faCaretDown} className={`bankDetailSelectDropDownIcon ${showBankOption && !bank && 'opened'} ${bank && 'refreshBtnColor'}`} onClick={() => navToBankOption()} />
          {showBankOption && !bank && <div className="bankDetailOptionContainer">
            {bankList.map((name, ind) => {
              return (
                <div key={ind} onClick={() => setBankNameValue(name)} className='bankDetailOptionSelector'>{name}</div>
              );
            })}
          </div>}
        </div>
        {/* State Section */}
        <div className={`bankDetailSelectContainer ${(!bank) ? 'disabledField' : ''} ${state && 'successBorder'}`} onClick={() => setShowStateOption(!showStateOption)}>
          <FontAwesomeIcon icon={faFlag} className={`bankDetailSelectIcon`} />
          <p>{state.statename || 'Select State'}</p>
          <FontAwesomeIcon icon={(state) ? faArrowsRotate : faCaretDown} className={`bankDetailSelectDropDownIcon ${(showStateOption && !state && bank) && 'opened'} ${state && 'refreshBtnColor'}`} onClick={() => navToStateOption()} />
          {(showStateOption && !state && bank) && <div className="bankDetailOptionContainer">
            {stateList.map((name, ind) => {
              return (
                <div key={ind} onClick={() => setStateNameValue(name)} className='bankDetailOptionSelector'>{name}</div>
              );
            })}
          </div>
          }
        </div>
        { /* District Section */}
        <div className={`bankDetailSelectContainer ${(!state) ? 'disabledField' : ''} ${district && 'successBorder'}`} onClick={() => setShowDistrictOption(!showDistrictOption)}>
          <FontAwesomeIcon icon={faCity} className={`bankDetailSelectIcon`} />
          <p>{district.districtname || 'Select District'}</p>
          <FontAwesomeIcon icon={(district) ? faArrowsRotate : faCaretDown} className={`bankDetailSelectDropDownIcon ${(showDistrictOption && !district && state) && 'opened'} ${district && 'refreshBtnColor'}`} onClick={() => navToDistrictOption()} />
          {(showDistrictOption && !district && state) && <div className="bankDetailOptionContainer">
            {districtList.map((name, ind) => {
              return (
                <div key={ind} onClick={() => setDistrictNameValue(name)} className='bankDetailOptionSelector'>{name}</div>
              );
            })}
          </div>
          }
        </div>
        { /* Branch Section */}
        <div className={`bankDetailSelectContainer ${(!district) ? 'disabledField' : ''}`} onClick={() => setShowBranchOption(!showBranchOption)}>
          <FontAwesomeIcon icon={faIndianRupeeSign} className={`bankDetailSelectIcon`} />
          <p>{branch.branchname || 'Select Branch'}</p>
          <FontAwesomeIcon icon={faCaretDown} className={`bankDetailSelectDropDownIcon ${showBranchOption && district && 'opened'}`} />
          {showBranchOption && district && <div className="bankDetailOptionContainer">
            {branchList.map((name, ind) => {
              return (
                <div key={ind} onClick={() => setBranchNameValue(name)} className='bankDetailOptionSelector'>{name}</div>
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