import contactUs from '../../Assets/Images/Icons/contactUs.png'
import HeaderTags from '../../Components/HeaderTags'
import '../../Assets/Styles/Contact.css'
function Contact() {
  return (
    <>
      <HeaderTags title={`${process.env.REACT_APP_NAME} | Contact Us`} description={`Contact us page of ${process.env.REACT_APP_NAME}`} />
      <div className='sectionContainer'>
        <h1 className='sectionHeaderTitle'>contact <span>us</span></h1>
        <div className="pageContainer">
          <div className="contactFormContainer shadowBoxContainer">
            <div className="contactFormLeftSide contactFormDirectChilds">
              <img src={contactUs} alt="contact us" />
            </div>
            <div className="contactFormRightSide contactFormDirectChilds">
              <h1>Get In Touch</h1>
              <p>How can we help you? Get any query.</p>
              <form method="post" className='contactUsForm' autoComplete="off">
                <input type="text" required className="contactFormField" placeholder='Enter your name' />
                <input type='email' required className="contactFormField" placeholder='Enter your email' />
                <textarea className="contactFormField" required placeholder='Enter message'></textarea>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
