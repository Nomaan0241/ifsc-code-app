import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Layouts/Navbar'
import Home from './Pages/Home/Home'
import About from './Pages/Home/About'
import Contact from './Pages/Home/Contact'
import Service from './Pages/Home/Service'
import OutletPage from './Pages/Extra/OutletPage'
import StateDetail from './Pages/Bank/StateDetail'
import DistrictDetail from './Pages/Bank/DistrictDetail'
import BankDetail from './Pages/Bank/BankDetail'
import PageNotFound from './Pages/Extra/PageNotFound'
import ShowFullDetails from './Pages/ShowFullDetails'

function App() {

  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path='/' element={<OutletPage />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='showfulldetails' element={<ShowFullDetails/>} />
          <Route path='contact' element={<Contact />} />
          <Route path='service' element={<Service />} />
          <Route path='bank' element={<OutletPage />} >
            <Route path=':bankName' element={<OutletPage />} >
              <Route index element={<BankDetail />} />
              <Route path=':stateName' element={<OutletPage />} >
                <Route index element={<StateDetail />} />
                <Route path=':districtName' element={<OutletPage />} >
                  <Route index element={<DistrictDetail />} />
                  <Route path=':branchName' element={<OutletPage />} >
                    <Route index element={<DistrictDetail />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
