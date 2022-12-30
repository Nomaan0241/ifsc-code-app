import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assets/Images/logo.png'
import '../Assets/Styles/Footer.css'

function Footer() {
  return (
    <>
      <footer id="footer">
        <div id='footerTopContainer'>
          <div className="footerContainer" id="footerContainer1">
            <img src={logo} alt="logo" />
          </div>
          <div className="footerContainer" id="footerContainer2">
            <h1>{process.env.REACT_APP_NAME}</h1>
            <p>{process.env.REACT_APP_TAGLINE}</p>
          </div>
          <div className="footerContainer" id="footerContainer3">
            <h1>Check</h1>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/contact'>Contact Us</Link></li>
            </ul >
          </div >
          <div className="footerContainer" id="footerContainer4">
            <h1>Search By</h1>
            <ul>
              <li><Link to='/'>Bank Info</Link></li>
              <li><Link to='/find-by-ifsc'>IFSC Info</Link></li>
              <li><Link to='/find-by-micr'>MICR Info</Link></li>
            </ul>
          </div>
        </div>
        <div id="footerBottomContainer">
          {process.env.REACT_APP_NAME} @ {new Date().getFullYear()} | All Rights Reserved | <span><Link to='terms-of-uses'>Terms of use</Link></span> | <span><Link to='disclaimer'>Disclaimer</Link></span>
        </div>
      </footer >
    </>
  )
}

export default Footer
