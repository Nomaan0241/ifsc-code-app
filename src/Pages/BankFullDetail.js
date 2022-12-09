import React from 'react'
import { useSelector } from 'react-redux'

function BankFullDetail() {
  const { IFSC, MICR, BANK, BRANCH, ADDRESS, STATE, CITY, DISTRICT, CONTACT } = useSelector((state) => state.ifscFetchDetails.ifsc)
  return (
    <>
      <>
        <h1 className='sectionHeaderTitle'>Bank <span>Details</span></h1>
        <div className="pageContainer">
          <div className="infoTable">
            <h1 className="infoTableHeading">{IFSC} Bank Details</h1>
            <div className='infoTableRow'>
              <div className='infoTableCol fieldNameCol'>Bank:</div>
              <div className='infoTableCol dataCol'>{BANK || 'No Data Available'}</div>
            </div>
            <div className='infoTableRow'>
              <div className='infoTableCol fieldNameCol'>Branch:</div>
              <div className='infoTableCol dataCol'>{BRANCH || 'No Data Available'}</div>
            </div>
            <div className='infoTableRow'>
              <div className='infoTableCol fieldNameCol'>IFSC Code:</div>
              <div className='infoTableCol dataCol'>{IFSC || 'No Data Available'}</div>
            </div>
            <div className='infoTableRow'>
              <div className='infoTableCol fieldNameCol'>MICR Code:</div>
              <div className='infoTableCol dataCol'>{MICR || 'No Data Available'}</div>
            </div>
            <div className='infoTableRow'>
              <div className='infoTableCol fieldNameCol'>Contact:</div>
              <div className='infoTableCol dataCol'>{CONTACT || 'No Data Available'}</div>
            </div>
            <div className='infoTableRow'>
              <div className='infoTableCol fieldNameCol'>Address:</div>
              <div className='infoTableCol dataCol'>{ADDRESS || 'No Data Available'}</div>
            </div>
            <div className='infoTableRow'>
              <div className='infoTableCol fieldNameCol'>City:</div>
              <div className='infoTableCol dataCol'>{CITY || 'No Data Available'}</div>
            </div>
            <div className='infoTableRow'>
              <div className='infoTableCol fieldNameCol'>District:</div>
              <div className='infoTableCol dataCol'>{DISTRICT || 'No Data Available'}</div>
            </div>
            <div className='infoTableRow'>
              <div className='infoTableCol fieldNameCol'>State:</div>
              <div className='infoTableCol dataCol'>{STATE || 'No Data Available'}</div>
            </div>
          </div>
          <div className="descriptionContainer">
            <h1 className='descriptionHeading'><span>{IFSC}</span> IFSC Code Details</h1>
            <p className='description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ea quam deleniti aliquid, enim ab cupiditate possimus! Nisi cumque delectus a ab sint asperiores assumenda, obcaecati nemo. Culpa a molestias quisquam autem at praesentium porro aspernatur consequuntur ipsam reprehenderit? Laborum, tempore ad nihil quae minus pariatur consequuntur sed, repellat placeat magnam repellendus commodi corrupti. Voluptatum officia eveniet </p>
          </div>
        </div>
      </>
    </>
  )
}

export default BankFullDetail
