import SearchImg from '../../Assets/Images/Icons/search.png'
import '../../Assets/Styles/FindByCodes.css'

function FindByIFSC() {
    return (
        <>
            <h1 className='sectionHeaderTitle'>Find by <span>IFSC</span></h1>
            <div className="pageContainer">
                <div className="shadowBoxContainer findByCodeContainer">
                    <div id='findByCodeImgContainer' className="findByCodeSubContainer">
                        <img src={SearchImg} alt="searching" />
                    </div>
                    <div id='findByIfscCodeContainer' className="findByCodeSubContainer">
                        <h1>Find Bank Details</h1>
                        <p>Find your bank details by IFSC Code</p>
                        <form className='findByCodeSearchForm'>
                            <input type="text" placeholder='Search your IFSC code here' className='findByCodeFormInputField' />
                            <button type="submit" id='findByCodeFormBtn' className='findByCodeFormInputField'>Submit</button>
                        </form>
                    </div>
                </div>
                <div id="aboutIfscSection">
                    <h1 className='headingStyle'>What is <span>IFSC Code?</span></h1>
                    <p>IFSC code is used by electronic payment system applications such as real-time gross settlement (RTGS), NEFT and Centralized Funds Management System (CFMS). This code is mandatory for fund transfers from one bank account to another. Every bank branch will have a unique code and no two branches (even of the same bank) will ever be the same.</p>
                </div>
                <div id="aboutIfscSection">
                    <h1 className='headingStyle'>Where to find <span>IFSC Code?</span></h1>
                    <p>You can find the IFSC code on your chequebook, passbook. You can also find it on RBI’s official website. You can also directly call the bank branch and ask for the code. Many third-party websites are also providing IFSC code information.</p>
                </div>
            </div>
        </>
    )
}

export default FindByIFSC
