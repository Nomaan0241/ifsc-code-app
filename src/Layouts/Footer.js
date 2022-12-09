import React from 'react'
import logo from '../Assets/Images/logo2.png'
import facebook from '../Assets/Images/Icons/facebook.png'
import google from '../Assets/Images/Icons/google.png'
import instagram from '../Assets/Images/Icons/instagram.png'
import { Link } from 'react-router-dom'
import '../Assets/Styles/Footer.css'

function Footer() {
  return (
    <>
      <div id="footer">
        <div className="footerContainer" id="footerContainer1">
          <img src={logo} alt="logo" />
        </div>
        <div className="footerContainer" id="footerContainer2">
          <h3>IFSC Code Website</h3>
          <p>IFSC Code is a place where you can know your bank details through IFSC Codes.</p>
        </div>
        <div className="footerContainer" id="footerContainer3">
          <h3>Check</h3>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/'>About</Link></li>
            <li><Link to='/'>Contact Us</Link></li>
            <li><Link to='/'>Service</Link></li>
          </ul >
        </div >
        <div className="footerContainer" id="footerContainer4">
          <a href='https://facebook.com' target='_blank' rel="noreferrer"><img src={facebook} alt="fb" className='footerSMIcons' /></a>
          <a href='https://google.com' target='_blank' rel="noreferrer"><img src={google} alt="gl" className='footerSMIcons' /></a>
          <a href='https://instagram.com' target='_blank' rel="noreferrer"><img src={instagram} alt="ig" className='footerSMIcons' /></a>
        </div>
      </div >
    </>
  )
}

export default Footer
