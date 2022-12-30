import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingColumns, faCaretDown, faFlag, faCity, faIndianRupeeSign, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { setIFSCSearchDetailInfo } from '../Middlewares/ReduxStore/IfscSearchDetailInfo'
import { setIfscFetchedDetails } from '../Middlewares/ReduxStore/IfscFetchDetails';
import { setLoadingState } from '../Middlewares/ReduxStore/ToggleStateSlice';
import { capitalizeConverter, slugConverter } from '../Utils/RoutingFormats'
import '../Assets/Styles/BankDetailSearchForm.css';
import axiosFetchBankDataInstance from '../Middlewares/AxiosInstance/AxiosInstance';

function IfscDetailSetComponent() {
  const { bank: bankList, state: stateList, district: districtList, branch: branchList } = useSelector((state) => state.ifscFetchDetails);
  const { bank, state, district, branch } = useSelector((state) => state.ifscSearchDetailInfo);
  const { bankNameSlug, stateNameSlug, districtNameSlug } = useParams();
  const [showBankOption, setShowBankOption] = useState(false);
  const [showStateOption, setShowStateOption] = useState(false);
  const [showDistrictOption, setShowDistrictOption] = useState(false);
  const [showBranchOption, setShowBranchOption] = useState(false);
  const [searchedValue, setSearchedValues] = useState({ bank: '', state: '', district: '', branch: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bankDetailNameWidth = useRef(50);

  function setBankNameValue(bankValue) {
    dispatch(setLoadingState(true));
    axiosFetchBankDataInstance({
      url: "api/bank-name/get-states",
      data: {
        BANK: capitalizeConverter(bankValue)
      },
    }).then((res) => {
      dispatch(setIfscFetchedDetails({ key: 'state', value: res.data.data }));
    }).catch((err) => {
      alert(err.message);
      navigate(`/`);
    }).finally(() => {
      dispatch(setLoadingState(false));
    });
    dispatch(setIFSCSearchDetailInfo({ key: 'bank', value: { bankname: capitalizeConverter(bankValue) } }));
  }

  function setStateNameValue(stateValue) {
    dispatch(setLoadingState(true));
    axiosFetchBankDataInstance({
      url: "api/bank-name/state/city",
      data: {
        BANK: bank.bankname,
        STATE: stateValue,
      },
    }).then((res) => {
      dispatch(setIfscFetchedDetails({ key: 'district', value: res.data.data }));
    }).catch((err) => {
      alert(err.message);
      navigate(`/`);
    }).finally(() => {
      dispatch(setLoadingState(false));
    });
    dispatch(setIFSCSearchDetailInfo({ key: 'state', value: { statename: stateValue } }));
  }

  function setDistrictNameValue(districtValue) {
    dispatch(setLoadingState(true));
    axiosFetchBankDataInstance({
      url: "api/bank-name/state/city/branch",
      data: {
        BANK: bank.bankname,
        STATE: state.statename,
        CITY: districtValue
      },
    }).then((res) => {
      dispatch(setIfscFetchedDetails({ key: 'branch', value: res.data.data }));
    }).catch((err) => {
      alert(err.message);
      navigate(`/`);
    }).finally(() => {
      dispatch(setLoadingState(false));
    });
    dispatch(setIFSCSearchDetailInfo({ key: 'district', value: { districtname: districtValue } }));
  }


  const navToBankOption = useCallback(function () {
    if (bank) {
      dispatch(setIFSCSearchDetailInfo({ key: 'bank', value: '' }));
      dispatch(setIFSCSearchDetailInfo({ key: 'state', value: '' }));
      dispatch(setIFSCSearchDetailInfo({ key: 'district', value: '' }));
      dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: '' }));
      navigate(`/`, { replace: true });
    }
  }, [bank, dispatch, navigate])

  const navToStateOption = useCallback(function () {
    if (state) {
      dispatch(setIFSCSearchDetailInfo({ key: 'state', value: '' }));
      dispatch(setIFSCSearchDetailInfo({ key: 'district', value: '' }));
      dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: '' }));
      navigate(`/bank/${bankNameSlug}`, { replace: true });
    }
  }, [bankNameSlug, state, dispatch, navigate])

  const navToDistrictOption = useCallback(function () {
    if (district) {
      dispatch(setIFSCSearchDetailInfo({ key: 'district', value: '' }));
      dispatch(setIFSCSearchDetailInfo({ key: 'branch', value: '' }));
      navigate(`/bank/${bankNameSlug}/${stateNameSlug}`, { replace: true });
    }
  }, [bankNameSlug, stateNameSlug, district, dispatch, navigate])

  useEffect(() => {
    bankDetailNameWidth.current = document.querySelector('.bankDetailSelectContainer p').offsetWidth;
  }, [])

  useEffect(() => {
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
        <div className='bankDetailSelectOuterContainer'>
          <div className={`bankDetailSelectContainer ${bank && 'successBorder'}`} onClick={() => setShowBankOption(!showBankOption)}>
            <FontAwesomeIcon icon={faBuildingColumns} className={`bankDetailSelectIcon`} />
            <p style={{ width: `${bankDetailNameWidth.current + 'px'}` }}>{bank.bankname || 'Select Bank'}</p>
            <FontAwesomeIcon icon={(bank) ? faArrowsRotate : faCaretDown} className={`bankDetailSelectDropDownIcon ${showBankOption && !bank && 'opened'} ${bank && 'refreshBtnColor'}`} onClick={() => navToBankOption()} />
          </div>
          {showBankOption && !bank && <div className="bankDetailOptionOuterContainer">
            <div className="bankDetailOptionSearchBoxContainer">
              <input type="text" className='bankDetailOptionSearchBox' value={searchedValue.bank} onChange={(e) => setSearchedValues({ ...searchedValue, bank: e.target.value })} placeholder='Search Bank Name' />
            </div>
            <div className="bankDetailOptionContainer">
              {searchedValue.bank ?
                bankList.filter((name) => name.toLowerCase().includes(searchedValue.bank.toLowerCase())).map((name, ind) => <Link to={`/bank/${slugConverter(name)}`} key={ind} onClick={() => setBankNameValue(name)} className='bankDetailOptionSelector'>● {name}</Link>) :
                bankList.map((name, ind) => <Link to={`/bank/${slugConverter(name)}`} key={ind} onClick={() => setBankNameValue(name)} className='bankDetailOptionSelector'>● {name}</Link>)}
            </div>
          </div>}
        </div>
        {/* State Section */}
        <div className='bankDetailSelectOuterContainer'>
          <div className={`bankDetailSelectContainer ${(!bank) && 'disabledField'} ${state && 'successBorder'}`} onClick={() => setShowStateOption(!showStateOption)}>
            <FontAwesomeIcon icon={faFlag} className={`bankDetailSelectIcon`} />
            <p style={{ width: `${bankDetailNameWidth.current + 'px'}` }}>{state.statename || 'Select State'}</p>
            <FontAwesomeIcon icon={(state) ? faArrowsRotate : faCaretDown} className={`bankDetailSelectDropDownIcon $
            {(showStateOption && !state && bank) && 'opened'} ${state && 'refreshBtnColor'}`} onClick={() => navToStateOption()} />
          </div>
          {(showStateOption && !state && bank) && <div className="bankDetailOptionOuterContainer">
            <div className="bankDetailOptionSearchBoxContainer">
              <input type="text" className='bankDetailOptionSearchBox' value={searchedValue.state} onChange={(e) => setSearchedValues({ ...searchedValue, state: e.target.value })} placeholder='Search State Name' />
            </div>
            <div className="bankDetailOptionContainer">
              {searchedValue.state ?
                stateList.filter((name) => name.toLowerCase().includes(searchedValue.state.toLowerCase())).map((name, ind) => <Link to={`/bank/${bankNameSlug}/${slugConverter(name)}`} key={ind} onClick={() => setStateNameValue(name)} className='bankDetailOptionSelector'>● {name}</Link>) :
                stateList.map((name, ind) => <Link to={`/bank/${bankNameSlug}/${slugConverter(name)}`} key={ind} onClick={() => setStateNameValue(name)} className='bankDetailOptionSelector'>● {name}</Link>)}
            </div>
          </div>
          }
        </div>
        { /* District Section */}
        <div className='bankDetailSelectOuterContainer'>
          <div className={`bankDetailSelectContainer ${(!state) ? 'disabledField' : ''} ${district && 'successBorder'}`} onClick={() => setShowDistrictOption(!showDistrictOption)}>
            <FontAwesomeIcon icon={faCity} className={`bankDetailSelectIcon`} />
            <p style={{ width: `${bankDetailNameWidth.current + 'px'}` }}>{district.districtname || 'Select District'}</p>
            <FontAwesomeIcon icon={(district) ? faArrowsRotate : faCaretDown} className={`bankDetailSelectDropDownIcon ${(showDistrictOption && !district && state) && 'opened'} ${district && 'refreshBtnColor'}`} onClick={() => navToDistrictOption()} />
          </div>
          {(showDistrictOption && !district && state) && <div className="bankDetailOptionOuterContainer">
            <div className="bankDetailOptionSearchBoxContainer">
              <input type="text" className='bankDetailOptionSearchBox' value={searchedValue.district} onChange={(e) => setSearchedValues({ ...searchedValue, district: e.target.value })} placeholder='Search District Name' />
            </div>
            <div className="bankDetailOptionContainer">
              {searchedValue.district ?
                districtList.filter((name) => name.toLowerCase().includes(searchedValue.district.toLowerCase())).map((name, ind) => <Link to={`/bank/${bankNameSlug}/${stateNameSlug}/${slugConverter(name)}`} key={ind} onClick={() => setDistrictNameValue(name)} className='bankDetailOptionSelector'>● {name}</Link>) :
                districtList.map((name, ind) => <Link to={`/bank/${bankNameSlug}/${stateNameSlug}/${slugConverter(name)}`} key={ind} onClick={() => setDistrictNameValue(name)} className='bankDetailOptionSelector'>● {name}</Link>)}
            </div>
          </div>
          }
        </div>
        { /* Branch Section */}
        <div className='bankDetailSelectOuterContainer'>
          <div className={`bankDetailSelectContainer ${(!district) ? 'disabledField' : ''}`} onClick={() => setShowBranchOption(!showBranchOption)}>
            <FontAwesomeIcon icon={faIndianRupeeSign} className={`bankDetailSelectIcon`} />
            <p style={{ width: `${bankDetailNameWidth.current + 'px'}` }}>{branch.branchname || 'Select Branch'}</p>
            <FontAwesomeIcon icon={faCaretDown} className={`bankDetailSelectDropDownIcon ${showBranchOption && district && 'opened'}`} />
          </div>
          {showBranchOption && district && <div className="bankDetailOptionOuterContainer">
            <div className="bankDetailOptionSearchBoxContainer">
              <input type="text" className='bankDetailOptionSearchBox' value={searchedValue.branch} onChange={(e) => setSearchedValues({ ...searchedValue, branch: e.target.value })} placeholder='Search Branch Name' />
            </div>
            <div className="bankDetailOptionContainer">
              {searchedValue.branch ?
                branchList.filter((name) => name.toLowerCase().includes(searchedValue.branch.toLowerCase())).map((name, ind) => <Link to={`/bank/${bankNameSlug}/${stateNameSlug}/${districtNameSlug}/${slugConverter(name)}`} key={ind} className='bankDetailOptionSelector'>● {name}</Link>) :
                branchList.map((name, ind) => <Link to={`/bank/${bankNameSlug}/${stateNameSlug}/${districtNameSlug}/${slugConverter(name)}`} key={ind} className='bankDetailOptionSelector'>● {name}</Link>)}
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default IfscDetailSetComponent