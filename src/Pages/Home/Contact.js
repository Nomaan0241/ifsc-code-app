import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoadingState } from '../../Middlewares/ReduxStore/ToggleStateSlice'
import contactUs from '../../Assets/Images/Icons/contactUs.png'
import HeaderTags from '../../Components/HeaderTags'
import axiosFetchBankDataInstance from '../../Middlewares/AxiosInstance/AxiosInstance';
import '../../Assets/Styles/Contact.css'

function Contact() {
  const dispatch = useDispatch();
  const [formDetail, setFormDetail] = useState({ userName: '', userMail: '', userMessage: '' })


  function submitForm(e) {
    e.preventDefault();
    dispatch(setLoadingState(true));
    axiosFetchBankDataInstance({
      url: "api/sendEmailToAdmin",
      data: {
        Name: formDetail.userName,
        Email: formDetail.userMail,
        Message: formDetail.userMessage
      },
    }).then((res) => {
      setFormDetail({ userName: '', userMail: '', userMessage: '' })
      alert(res.data.status);
    }).catch((err) => {
      alert(err.message);
    }).finally(() => {
      dispatch(setLoadingState(false));
    });
  }

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
              <form onSubmit={(e) => submitForm(e)} method="post" className='contactUsForm' autoComplete="off">
                <input value={formDetail.userName} type="text" required className="contactFormField" placeholder='Enter your name' onChange={(e) => setFormDetail({ ...formDetail, userName: e.target.value })} />
                <input value={formDetail.userMail} type='email' required className="contactFormField" placeholder='Enter your email' onChange={(e) => setFormDetail({ ...formDetail, userMail: e.target.value })} />
                <textarea value={formDetail.userMessage} className="contactFormField" required placeholder='Enter message' onChange={(e) => setFormDetail({ ...formDetail, userMessage: e.target.value })}></textarea>
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
