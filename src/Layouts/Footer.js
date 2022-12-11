import React from 'react'
import logo from '../Assets/Images/logo.png'
import facebook from '../Assets/Images/Icons/facebook.png'
import google from '../Assets/Images/Icons/google.png'
import instagram from '../Assets/Images/Icons/instagram.png'
import { Link } from 'react-router-dom'
import '../Assets/Styles/Footer.css'

function Footer() {
  return (
    <>
      <footer id="footer">
        <div className="footerContainer" id="footerContainer1">
          <img src={logo} alt="logo" />
        </div>
        <div className="footerContainer" id="footerContainer2">
          <h1>IFSC Code Website</h1>
          <p>IFSC Code is a place where you can know your bank details through IFSC Codes.</p>
        </div>
        <div className="footerContainer" id="footerContainer3">
          <h1>Check</h1>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
            <li><Link to='/service'>Service</Link></li>
          </ul >
        </div >
        <div className="footerContainer" id="footerContainer4">
          <a href='https://facebook.com' target='_blank' rel="noreferrer"><img src={facebook} alt="fb" className='footerSMIcons' /></a>
          <a href='https://google.com' target='_blank' rel="noreferrer"><img src={google} alt="gl" className='footerSMIcons' /></a>
          <a href='https://instagram.com' target='_blank' rel="noreferrer"><img src={instagram} alt="ig" className='footerSMIcons' /></a>
        </div>
      </footer >
    </>
  )
}

export default Footer
