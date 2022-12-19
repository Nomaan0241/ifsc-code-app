import SearchImg from '../../Assets/Images/Icons/search.png'
import '../../Assets/Styles/FindByCodes.css'

function FindByMICR() {
    return (
        <>
            <h1 className='sectionHeaderTitle'>Find by <span>MICR</span></h1>
            <div className="pageContainer">
                <div className="shadowBoxContainer findByCodeContainer">
                    <div id='findByCodeImgContainer' className="findByCodeSubContainer">
                        <img src={SearchImg} alt="searching" />
                    </div>
                    <div id='findByIfscCodeContainer' className="findByCodeSubContainer">
                        <h1>Find Bank Details</h1>
                        <p>Find your bank details by MICR Code</p>
                        <form className='findByCodeSearchForm'>
                            <input type="text" placeholder='Search your MICR code here' className='findByCodeFormInputField' />
                            <button type="submit" id='findByCodeFormBtn' className='findByCodeFormInputField'>Submit</button>
                        </form>
                    </div>
                </div>
                <div id="aboutIfscSection">
                    <h1 className='headingStyle'>What is <span>MICR Code?</span></h1>
                    <p>MICR code is a code printed on cheques using MICR (Magnetic Ink Character Recognition technology). This enables identification of the cheques and which in turns means faster processing. An MICR code is a 9-digit code that uniquely identifies the bank and branch participating in an Electronic Clearing System (ECS).</p>
                </div>
                <div id="aboutIfscSection">
                    <h1 className='headingStyle'>Where to find <span>MICR Code?</span></h1>
                    <p>You can find the IFSC code on your chequebook, passbook. You can also find it on RBI’s official website. You can also directly call the bank branch and ask for the code. Many third-party websites are also providing MICR code information.</p>
                </div>
            </div>
        </>
    )
}

export default FindByMICR
