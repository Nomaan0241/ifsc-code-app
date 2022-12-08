import React from 'react'
import { useSelector } from 'react-redux'

function BankFullDetail() {
  const { IFSC, MICR, BANK, BRANCH, ADDRESS, STATE, CITY, DISTRICT, CONTACT } = useSelector((state) => state.ifscFetchDetails.ifsc)
  return (
    <>
      <>
        <h1 className='sectionHeaderTitle'>Bank <span>Details</span></h1>
        <div>Bank: {BANK}</div>
        <div>Branch: {BRANCH}</div>
        <div>IFSC Code: {IFSC}</div>
        <div>MICR Code: {MICR}</div>
        <div>Contact: {CONTACT}</div>
        <div>Address: {ADDRESS}</div>
        <div>City: {CITY}</div>
        <div>District: {DISTRICT}</div>
        <div>State: {STATE}</div>
      </>
    </>
  )
}

export default BankFullDetail
