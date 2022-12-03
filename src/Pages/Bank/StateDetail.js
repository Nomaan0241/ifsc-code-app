import Typed from "react-typed"
import RightSideArrow from "../../Assets/Images/Icons/rightSideArrow.png"
import '../../Assets/Styles/Home.css';
import BankDetailSearchForm from '../../Components/BankDetailSearchForm';
import FindIFSCSetDistrictComponent from "../../Components/SetIfscDistrictDetail";

function StateDetail() {
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
                    
                    <button id='homeBannerBtn'>
                        <span>Know More</span>
                        <img src={RightSideArrow} alt="right side arrow" />
                    </button>
                </div>
                <div className="homeSubContainer homeRightSideContainer">
                    <FindIFSCSetDistrictComponent/>
                </div>
            </div>
        </>
    )
}

export default StateDetail
