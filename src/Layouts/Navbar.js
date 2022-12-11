import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { setNavToggle } from '../Middlewares/ReduxStore/ToggleStateSlice'
import iconLogo from '../Assets/Images/logo.png'
import '../Assets/Styles/Navbar.css'
import IfscSearchBox from '../Components/IfscSearchBox'


function Navbar() {
    const NavToggleVal = useSelector(state => state.toggleState.navToggle);
    const Dispatch = useDispatch();

    function toggleNavValue() {
        Dispatch(setNavToggle());
    }

    return (
        <>
            <header>
                <Link id='mainLogoContainer' to="/"><img src={iconLogo} alt="logo" id='mainLogo' /></Link>
                <div className={`${(NavToggleVal) ? 'show' : ''} btnSection`}>
                    <ul className='navbar'>
                        <li><NavLink to="/" onClick={toggleNavValue}>Home</NavLink></li>
                        <li><NavLink to="/about" onClick={toggleNavValue}>About</NavLink></li>
                        <li><NavLink to="/contact" onClick={toggleNavValue}>Contact Us</NavLink></li>
                        <li><NavLink to="/service" onClick={toggleNavValue}>Service</NavLink></li>
                    </ul>
                    <IfscSearchBox/>
                </div>
                <FontAwesomeIcon icon={NavToggleVal ? faBars : faXmark} onClick={() => toggleNavValue()} className='headerIconStyle' id='menuIcon'/>
            </header>
        </>
    )
}

export default Navbar
