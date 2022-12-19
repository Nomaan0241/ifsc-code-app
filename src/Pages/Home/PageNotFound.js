import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import PageNotFoundImg from '../../Assets/Images/Icons/pageNotFound.png'
import '../../Assets/Styles/PageNotFound.css'
function PageNotFound() {
  return (
    <>
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
