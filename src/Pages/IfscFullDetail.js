import { useSelector } from 'react-redux'
function IfscFullDetail() {
    const bankName = useSelector((state) => state.ifscSearchDetailInfo.bank.bankname);
    const stateName = useSelector((state) => state.ifscSearchDetailInfo.state.statename);
    const districtName = useSelector((state) => state.ifscSearchDetailInfo.district.districtname);
    const branchName = useSelector((state) => state.ifscSearchDetailInfo.branch.branchname);
    return (
        <div>
            <h1>Full Details</h1>
            <div>Bank: {bankName}</div>
            <div>State: {stateName}</div>
            <div>District: {districtName}</div>
            <div>Branch: {branchName}</div>
        </div>
    )
}

export default IfscFullDetail
