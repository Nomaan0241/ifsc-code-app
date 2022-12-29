import Typed from "react-typed"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import IfscDetailSetComponent from "../../Components/IfscDetailSetComponent";
import '../../Assets/Styles/Home.css';

function Home() {
    const textLines = [`IFSC`, `MICR`, `Banks`];
    return (
        <>            
            <div className="homeContainer homeFullWithContainer">
                <div className="homeSubContainer homeLeftSideContainer">
                    <h1 id="homeHeading">Find&nbsp;
                        <span id='homeHeadingAutoType'>
                            <Typed strings={textLines} typeSpeed={100} backSpeed={50} startDelay={100} backDelay={1000} loop />
                        </span>
                    </h1>
                    <p id="homeSubHeading">{process.env.REACT_APP_TAGLINE}</p>
                    <Link to='/find-by-ifsc' className="btnWithIcon" id='homeBannerBtn'>
                        <span>Search IFSC</span>
                        <FontAwesomeIcon icon={faCircleChevronRight} />
                    </Link>
                </div>
                <div className="homeSubContainer homeRightSideContainer">
                    <IfscDetailSetComponent />
                </div>
            </div>

        </>
    )
}

export default Home
