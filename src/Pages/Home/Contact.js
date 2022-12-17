import contactUs from '../../Assets/Images/Icons/contactUs.png'
import '../../Assets/Styles/Contact.css'
function Contact() {
  return (
    <div className='sectionContainer'>
      <h1 className='sectionHeaderTitle'>contact <span>us</span></h1>
      <div className="pageContainer">
        <div className="contactFormContainer">
          <div className="contactFormLeftSide contactFormDirectChilds">
            <img src={contactUs} alt="contact us" />
          </div>
          <div className="contactFormRightSide contactFormDirectChilds">
            <h1>Get In Touch</h1>
            <p>How can we help you? Get any query.</p>
            <form method="post" className='contactUsForm'>
              <input type="text" required className="contactFormField" placeholder='Enter your name' />
              <input type='email' required className="contactFormField" placeholder='Enter your email' />
              <textarea className="contactFormField" required rows="4" placeholder='Enter message'></textarea>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
