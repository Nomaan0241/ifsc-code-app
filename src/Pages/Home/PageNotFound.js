import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import PageNotFoundImg from '../../Assets/Images/Icons/pageNotFound.png'
import HeaderTags from '../../Components/HeaderTags'
import '../../Assets/Styles/PageNotFound.css'
function PageNotFound() {
  return (
    <>
      <HeaderTags
        title={`${process.env.REACT_APP_NAME} | Page Not Found`}
        description={`Page Not Found`}
      />
      <div className="pageContainer">
        <div className="pageNotFoundContainer">
          <img src={PageNotFoundImg} alt="404 Error" className='pageNotFoundImg' />
          <h1>Nothing is here</h1>
          <p>May be the page you are looking for is not found or never existed.</p>
          <Link to='/' id='pageNotFoundBtn' className="btnWithIcon" >
            <span>Go to Home</span>
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Link>
        </div>
      </div>
    </>
  )
}

export default PageNotFound
