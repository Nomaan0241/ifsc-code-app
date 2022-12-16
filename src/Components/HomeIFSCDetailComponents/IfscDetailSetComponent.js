import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingColumns, faCaretDown, faFlag, faCity, faIndianRupeeSign, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { setIFSCSearchDetailInfo } from '../../Middlewares/ReduxStore/IfscSearchDetailInfo'
import '../../Assets/Styles/BankDetailSearchForm.css';
import { setIfscFetchedDetails } from '../../Middlewares/ReduxStore/IfscFetchDetails';
import { setLoadingState } from '../../Middlewares/ReduxStore/ToggleStateSlice';
import { slugConverter } from '../../Utils/RoutingFormats'

function IfscDetailSetComponent() {
  const { bank: bankList, state: stateList, district: districtList, branch: branchList } = useSelector((state) => state.ifscFetchDetails);
  const { bank, state, district, branch } = useSelector((state) => state.ifscSearchDetailInfo);
  const { bankNameSlug, stateNameSlug, districtNameSlug } = useParams();
  const [showBankOption, setShowBankOption] = useState(false);
  const [showStateOption, setShowStateOption] = useState(false);
  const [showDistrictOption, setShowDistrictOption] = useState(false);
  const [showBranchOption, setShowBranchOption] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bankDetailNameWidth = useRef(50);

  // console.log(bankNameSlug, stateNameSlug, districtNameSlug, branchNameSlug);

  function setBankNameValue(bankValue) {
    dispatch(setLoadingState(true));
    axios({
      method: "post",
      url: "https://findbankifsccode.onrender.com/api/bank-name/get-states",
      data: {
        BANK: bankValue,
      },
    }).then((res) => {
      console.log(res.data);
      dispatch(setIfscFetchedDetails({ key: 'state', value: res.data.data }))
    }).catch((err) => {
      console.log(err);
      alert(err.message);
      navigate(`/`);
    }).finally(() => {
      dispatch(setLoadingState(false));
    });
    dispatch(setIFSCSearchDetailInfo({ key: 'bank', value: { bankname: bankValue } }));
    navigate(`bank/${slugConverter(bankValue)}`);
  }

  function setStateNameValue(stateValue) {
    dispatch(setLoadingState(true));
    axios({
      method: "post",
      url: "https://findbankifsccode.onrender.com/api/bank-name/state/city",
      data: {
        BANK: bank.bankname,
        STATE: stateValue,
      },
    }).then((res) => {
      console.log(res.data);
      dispatch(setIfscFetchedDetails({ key: 'district', value: res.data.data }))
    }).catch((err) => {
      alert(err.message);
      navigate(`/`);
    }).finally(() => {
      dispatch(setLoadingState(false));
    });
    dispatch(setIFSCSearchDetailInfo({ key: 'state', value: { statename: stateValue } }));
    navigate(`/bank/${bankNameSlug}/${slugConverter(stateValue)}`);
  }

  function setDistrictNameValue(districtValue) {
    dispatch(setLoadingState(true));
    axios({
      method: "post",
      url: "https://findbankifsccode.onrender.com/api/bank-name/state/city/branch",
      data: {
        BANK: bank.bankname,
        STATE: state.statename,
        CITY: districtValue
      },
    }).then((res) => {
      console.log(res.data);
      dispatch(setIfscFetchedDetails({ key: 'branch', value: res.data.data }));
    }).catch((err) => {
      alert(err.message);
      navigate(`/`);
    }).finally(() => {
      dispatch(setLoadingState(false));
    });
    dispatch(setIFSCSearchDetailInfo({ key: 'district', value: { districtname: districtValue, districtvalue: slugConverter(districtValue) } }));
    navigate(`/bank/${bankNameSlug}/${stateNameSlug}/${slugConverter(districtValue)}`);
  }

  function setBranchNameValue(branchValue) {
    // dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: { branchname: branchValue } }));
    navigate(`/bank/${bankNameSlug}/${stateNameSlug}/${districtNameSlug}/${slugConverter(branchValue)}`);
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
      navigate(`/bank/${bankNameSlug}`, { replace: true });
    }
  }, [bankNameSlug, state, dispatch, navigate])

  const navToDistrictOption = useCallback(function () {
    if (district) {
      dispatch(setIFSCSearchDetailInfo({ key: 'district', value: '' }))
      dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: '' }))
      navigate(`/bank/${bankNameSlug}/${stateNameSlug}`, { replace: true });
    }
  }, [bankNameSlug, stateNameSlug, district, dispatch, navigate])

  useEffect(() => {
    bankDetailNameWidth.current = document.querySelector('.bankDetailSelectContainer  p').offsetWidth;

    if (!bankNameSlug) {
      navToBankOption();
    }
    else if (!stateNameSlug) {
      navToStateOption();
    }
    else if (!districtNameSlug) {
      navToDistrictOption();
    }
  }, [bankNameSlug, stateNameSlug, districtNameSlug, navToBankOption, navToStateOption, navToDistrictOption])

  return (
    <div id='bankDetailSearchContainer'>
      <h1>IFSC Code <span>Finder</span></h1>
      <div id='bankDetailFormContainer'>
        {/* Bank Section */}
        <div className={`bankDetailSelectContainer ${bank && 'successBorder'}`} onClick={() => setShowBankOption(!showBankOption)}>
          <FontAwesomeIcon icon={faBuildingColumns} className={`bankDetailSelectIcon`} />
          <p style={{ width: `${bankDetailNameWidth.current + 'px'}` }} >{bank.bankname || 'Select Bank'}</p>
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
        <div className={`bankDetailSelectContainer ${(!bank) && 'disabledField'} ${state && 'successBorder'}`} onClick={() => setShowStateOption(!showStateOption)}>
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