import { useSelector } from 'react-redux'

function IfscFullDetail() {
    const bankName = useSelector((state) => state.ifscSearchDetailInfo.bank.bankname);
    const stateName = useSelector((state) => state.ifscSearchDetailInfo.state.statename);
    const districtName = useSelector((state) => state.ifscSearchDetailInfo.district.districtname);
    const branchName = useSelector((state) => state.ifscSearchDetailInfo.branch.branchname);
    return (
        <>
            <h1 className='sectionHeaderTitle'>Bank <span>Details</span></h1>
            <div className="pageContainer">
                <div className="infoTable">
                    <h1 className="infoTableHeading">{bankName} IFSC Details</h1>
                    <div className='infoTableRow'>
                        <div className='infoTableCol fieldNameCol'>Bank:</div>
                        <div className='infoTableCol dataCol'>{bankName || 'No Data Available'}</div>
                    </div>
                    <div className='infoTableRow'>
                        <div className='infoTableCol fieldNameCol'>State:</div>
                        <div className='infoTableCol dataCol'>{stateName || 'No Data Available'}</div>
                    </div>
                    <div className='infoTableRow'>
                        <div className='infoTableCol fieldNameCol'>District:</div>
                        <div className='infoTableCol dataCol'>{districtName || 'No Data Available'}</div>
                    </div>
                    <div className='infoTableRow'>
                        <div className='infoTableCol fieldNameCol'>Branch:</div>
                        <div className='infoTableCol dataCol'>{branchName || 'No Data Available'}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IfscFullDetail
