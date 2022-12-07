import React from 'react'
import Home from '../Home/Home'
import SetIfscBranchDetail from '../../Components/HomeIFSCDetailComponents/SetIfscBranchDetail'

function BranchDetailRoute() {
  return (
    <>
      <Home IFSCDetailTakerComponent={SetIfscBranchDetail} />
    </>
  )
}

export default BranchDetailRoute
