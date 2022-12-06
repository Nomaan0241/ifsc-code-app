import { Route, Routes } from 'react-router-dom'
import Navbar from './Layouts/Navbar'
import Home from './Pages/Home/Home'
import About from './Pages/Home/About'
import Contact from './Pages/Home/Contact'
import Service from './Pages/Home/Service'
import OutletPage from './Pages/Extra/OutletPage'
import PageNotFound from './Pages/Extra/PageNotFound'
import IfscFullDetail from './Pages/IfscFullDetail'
import SetIfscBankDetail from './Components/HomeIFSCDetailComponents/SetIfscBankDetail'
import SetIfscStateDetail from './Components/HomeIFSCDetailComponents/SetIfscStateDetail'
import SetIfscDistrictDetail from './Components/HomeIFSCDetailComponents/SetIfscDistrictDetail'
import SetIfscBranchDetail from './Components/HomeIFSCDetailComponents/SetIfscBranchDetail'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<OutletPage />}>
          <Route index element={<Home IFSCDetailTakerComponent={SetIfscBankDetail} />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='service' element={<Service />} />
          <Route path='bank' element={<OutletPage />} >
            <Route path=':bankName' element={<OutletPage />} >
              <Route index element={<Home IFSCDetailTakerComponent={SetIfscStateDetail} />} />
              <Route path=':stateName' element={<OutletPage />} >
                <Route index element={<Home IFSCDetailTakerComponent={SetIfscDistrictDetail} />} />
                <Route path=':districtName' element={<OutletPage />} >
                  <Route index element={<Home IFSCDetailTakerComponent={SetIfscBranchDetail} />} />
                  <Route path=':branchName' element={<OutletPage />} >
                    <Route index element={<IfscFullDetail />} />
                    <Route path='details' element={<IfscFullDetail />} />
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
