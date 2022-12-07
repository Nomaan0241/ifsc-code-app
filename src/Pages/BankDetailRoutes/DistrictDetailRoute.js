import React from 'react'
import Home from '../Home/Home'
import SetIfscDistrictDetail from '../../Components/HomeIFSCDetailComponents/SetIfscDistrictDetail'

function DistrictDetailRoute() {
  return (
    <>
      <Home IFSCDetailTakerComponent={SetIfscDistrictDetail} /> 
    </>
  )
}

export default DistrictDetailRoute
