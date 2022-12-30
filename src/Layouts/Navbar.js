import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { setNavToggle, setLoadingState } from '../Middlewares/ReduxStore/ToggleStateSlice'
import { setIfscFetchedDetails } from '../Middlewares/ReduxStore/IfscFetchDetails'
import { setIFSCSearchDetailInfo } from '../Middlewares/ReduxStore/IfscSearchDetailInfo'
import axiosFetchBankDataInstance from '../Middlewares/AxiosInstance/AxiosInstance';
import iconLogo from '../Assets/Images/logo.png'
import '../Assets/Styles/Navbar.css'


function Navbar() {
    const NavToggleVal = useSelector(state => state.toggleState.navToggle);
    const [ifscValue, setIfscValue] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function toggleNavValue() {
        dispatch(setNavToggle(!NavToggleVal));
    }



    function getIFSCData(e) {
        e.preventDefault();
        dispatch(setLoadingState(true));
        axiosFetchBankDataInstance({
            url: "api/ifsc",
            data: {
                IFSC: ifscValue.toUpperCase(),
            },
        }).then((res) => {
            console.log(res.data);
            dispatch(setIFSCSearchDetailInfo({ key: 'ifsc', value: ifscValue }))
            dispatch(setIfscFetchedDetails({ key: 'ifsc', value: res.data.data }))
            navigate(`/ifsc/${ifscValue}`);
        }).catch((err) => {
            alert(err.message);
            navigate(`/`);
        }).finally(() => {
            dispatch(setLoadingState(false));
        });
        setIfscValue('');
    }

    return (
        <>
            <header>
                <Link id='mainLogoContainer' to="/"><img src={iconLogo} alt="logo" id='mainLogo' /></Link>
                <nav className={`${(NavToggleVal) ? 'show' : ''} btnSection`}>
                    <ul className='navbar'>
                        <li><NavLink to="/" onClick={toggleNavValue}>Home</NavLink></li>
                        <li><NavLink to="/about" onClick={toggleNavValue}>About</NavLink></li>
                        <li><NavLink to="/contact" onClick={toggleNavValue}>Contact Us</NavLink></li>
                        <li><NavLink to="/find-by-ifsc" onClick={toggleNavValue}>Find by IFSC</NavLink></li>
                        <li><NavLink to="/find-by-micr" onClick={toggleNavValue}>Find by MICR</NavLink></li>
                    </ul>
                </nav>
                <form onSubmit={(e) => getIFSCData(e)} method='get' className='ifscSearchBoxContainer' autoComplete="off">
                    <input pattern="^[A-Za-z]{4}0[A-Za-z0-9]{6}$" type="text" name="ifscInput" onChange={(e) => setIfscValue(e.target.value)} value={ifscValue} id="ifscSearchBox" placeholder='Search Any IFSC Code' title="Enter correct IFSC Code." maxLength={11} required />
                    <button type='submit' id='ifscSearchBtn' >
                        <FontAwesomeIcon icon={faMagnifyingGlass} /><span>s</span>
                    </button>
                </form>
                <div className='headerIconStyle' id='menuIcon'>
                    <FontAwesomeIcon icon={NavToggleVal ? faXmark : faBars} onClick={toggleNavValue} />
                </div>
            </header>
        </>
    )
}

export default Navbar
