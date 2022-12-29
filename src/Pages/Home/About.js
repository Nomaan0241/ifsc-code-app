import targetImg from '../../Assets/Images/Icons/targetIcon.png'
import missionImg from '../../Assets/Images/Icons/mission.png'
import HeaderTags from '../../Components/HeaderTags'
import '../../Assets/Styles/About.css'

function About() {

  return (
    <>
      <HeaderTags title={`${process.env.REACT_APP_NAME} | About Us`} description={`About us page of ${process.env.REACT_APP_NAME}`}/>
      <h1 className='sectionHeaderTitle'>About <span>us</span></h1>
      {/* what is ifsc section */}
      <div className="pageContainer">
        <div className='infoBox'>
          <h1 className='infoHeading'>What is <span>IFSC Code?</span></h1>
          <p>IFSC code is used by electronic payment system applications such as real-time gross settlement (RTGS), NEFT and Centralized Funds Management System (CFMS). This code is mandatory for fund transfers from one bank account to another. Every bank branch will have a unique code and no two branches (even of the same bank) will ever be the same.</p>
        </div>
      </div>
      {/* branches data show section */}
      <div className='aboutFullWidthPageContainer'>
        <div className='pageContainer'>
          <h1 className='infoHeading'>Data <span>Available</span></h1>
          <div id="bankDataInfoSection">
            <div className="bankDataInfoContainer">
              <h2>165<span>+</span></h2>
              <p>Banks</p>
            </div>
            <div className="bankDataInfoContainer">
              <h2>29<span>+</span></h2>
              <p>States</p>
            </div>
            <div className="bankDataInfoContainer">
              <h2>645<span>+</span></h2>
              <p>Districts</p>
            </div>
            <div className="bankDataInfoContainer">
              <h2>162983<span>+</span></h2>
              <p>Branches</p>
            </div>
          </div>
        </div>
      </div>
      {/* who we are section */}
      <div className='pageContainer'>
        <div id='whoWeAreSection' className='detailSectionContainer'>
          <div id='whoWeAreLeftContainer' className='detailSectionLeftContainer'>
            <img src={targetImg} alt="targetImage" />
          </div>
          <div id='whoWeAreRightContainer' className='detailRightSectionContainer'>
            <h1 className='headingStyle' >Our Goal <span></span></h1>
            <p>{`It gives us great pleasure to present to you <website name>! A place where you can very easily find IFSC (India Financial System Code) code. The websites currently lists around 1 lac bank branches of around 150 banks in India.`}</p>
          </div>
        </div>
        {/* our mission section */}
        <div id='ourMissionSection' className='detailSectionContainer'>
          <div id='ourMissionSectionLeftContainer' className='detailSectionLeftContainer'>
            <img src={missionImg} alt="targetImage" />
          </div>
          <div id='ourMissionSectionRightContainer' className='detailRightSectionContainer'>
            <h1 className='headingStyle'>Our Mission<span></span></h1>
            <p>{`It gives us great pleasure to present to you <website name>! A place where you can very easily find IFSC (India Financial System Code) code. The websites currently lists around 1 lac bank branches of around 150 banks in India.`}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About