import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setNavToggle } from '../Middlewares/ReduxStore/NavToggleSlice'
import iconLogo from '../Assets/Images/logo2.png'
import menuIcon from '../Assets/Images/Icons/menuIcon.png'
import '../Assets/Styles/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


function Navbar() {
    const NavToggleVal = useSelector(state => state.NavToggle);
    const Dispatch = useDispatch();

    function toggleNavValue() {
        Dispatch(setNavToggle());
    }

    function getIFSCData() {

    }
    return (
        <>
            <header>
                <Link to="/"><img src={iconLogo} alt="logo" className='mainLogo' /></Link>
                <div className={`${(NavToggleVal) ? 'show' : ''} btnSection`}>
                    <ul className='navbar'>
                        <li><NavLink to="/" onClick={toggleNavValue}>Home</NavLink></li>
                        <li><NavLink to="/about" onClick={toggleNavValue}>About</NavLink></li>
                        <li><NavLink to="/contact" onClick={toggleNavValue}>Contact Us</NavLink></li>
                        <li><NavLink to="/service" onClick={toggleNavValue}>Service</NavLink></li>
                    </ul>
                    <form onSubmit={getIFSCData} method='get' className='ifscSearchBoxContainer'>
                        <input type="text" name="ifscInput" id="ifscSearchBox" placeholder='Search IFSC Code' />
                        <button id='ifscSearchBtn'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>

                    </form>
                </div>
                <img src={menuIcon} onClick={() => toggleNavValue()} className='headerIconStyle' id='menuIcon' alt="menuBtn" />
            </header>
        </>
    )
}

export default Navbar
