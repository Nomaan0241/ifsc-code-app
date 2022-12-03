import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setNavToggle } from '../Middlewares/ReduxStore/NavToggleSlice'
import iconLogo from '../Assets/Images/logo.png'
import menuIcon from '../Assets/Images/Icons/menuIcon.png'
import searchIcon from '../Assets/Images/Icons/searchIcon.png'
import '../Assets/Styles/Navbar.css'


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
                        <li><Link to="/" onClick={toggleNavValue}>Home</Link></li>
                        <li><Link to="/about" onClick={toggleNavValue}>About</Link></li>
                        <li><Link to="/contact" onClick={toggleNavValue}>Contact Us</Link></li>
                        <li><Link to="/service" onClick={toggleNavValue}>Service</Link></li>
                    </ul>
                    <form onSubmit={getIFSCData} method='get' className='ifscSearchBoxContainer'>
                        <input type="text" name="ifscInput" id="ifscSearchBox" placeholder='Search IFSC Code' />
                        <button id='ifscSearchBtn'><img src={searchIcon} alt="searchBtn" /></button>
                    </form>
                </div>
                <img src={menuIcon} onClick={() => toggleNavValue()} className='headerIconStyle' id='menuIcon' alt="menuBtn" />
            </header>
        </>
    )
}

export default Navbar
