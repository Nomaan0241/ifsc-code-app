import Typed from "react-typed"
import { Link } from 'react-router-dom'
import RightSideArrow from "../../Assets/Images/Icons/rightSideArrow.png"
import '../../Assets/Styles/Home.css';

function Home({ IFSCDetailTakerComponent }) {
    const textLines = [`IFSC`, `Banks`, `Address`];
    return (
        <>
            <div className="homeContainer fullWithContainer">
                <div className="homeSubContainer homeLeftSideContainer">
                    <h1 id="homeHeading">Find&nbsp;
                        <span id='homeHeadingAutoType'>
                            <Typed strings={textLines} typeSpeed={100} backSpeed={50} startDelay={100} backDelay={1000} loop />
                        </span>
                    </h1>
                    <p id="homeSubHeading">Website Name is a place where you can know your bank details through IFSC Codes.</p>
                    <Link to='/about' id='homeBannerBtn'>
                        <span>Know More</span>
                        <img src={RightSideArrow} alt="right side arrow" />
                    </Link>
                </div>
                <div className="homeSubContainer homeRightSideContainer">
                    <IFSCDetailTakerComponent />
                </div>
            </div>
        </>
    )
}

export default Home
