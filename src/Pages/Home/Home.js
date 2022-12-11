import Typed from "react-typed"
import { Link } from 'react-router-dom'
import '../../Assets/Styles/Home.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import IfscDetailSetComponent from "../../Components/HomeIFSCDetailComponents/IfscDetailSetComponent";

function Home({ IFSCDetailTakerComponent }) {
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
                    <p id="homeSubHeading">Website Name is a place where you can know your bank details through IFSC Codes.</p>
                    <Link to='/about' id='homeBannerBtn'>
                        <span>Know More</span>
                        <FontAwesomeIcon icon={faCircleChevronRight} />
                    </Link>
                </div>
                <div className="homeSubContainer homeRightSideContainer">
                    <IfscDetailSetComponent />
                    {/* <IFSCDetailTakerComponent /> */}
                </div>
            </div>
        </>
    )
}

export default Home
