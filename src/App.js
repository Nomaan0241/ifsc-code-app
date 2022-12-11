import { Route, Routes } from 'react-router-dom'
import Navbar from './Layouts/Navbar'
import Home from './Pages/Home/Home'
import About from './Pages/Home/About'
import Contact from './Pages/Home/Contact'
import Service from './Pages/Home/Service'
import OutletPage from './Pages/Outlets/OutletPage'
import PageNotFound from './Pages/Extra/PageNotFound'
import IfscFullDetail from './Pages/IfscFullDetail'
import SetIfscBankDetail from './Components/HomeIFSCDetailComponents/SetIfscBankDetail'
import StateDetailRoute from './Pages/BankDetailRoutes/StateDetailRoute'
import DistrictDetailRoute from './Pages/BankDetailRoutes/DistrictDetailRoute'
import BranchDetailRoute from './Pages/BankDetailRoutes/BranchDetailRoute'
import BankFullDetail from './Pages/BankFullDetail'
import Footer from './Layouts/Footer'
import Loader from './Components/Loader'
import { useSelector } from 'react-redux'

function App() {
  const loadiing = useSelector((state)=> state.toggleState.isLoading)
  return (
    <>
      {loadiing && <Loader />}
      <Navbar />
      <Routes>
        <Route path='/' element={<OutletPage />}>
          <Route index element={<Home IFSCDetailTakerComponent={SetIfscBankDetail} />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='service' element={<Service />} />
          <Route path='ifsc' element={<OutletPage />}>
            <Route path=':ifscCode' element={<BankFullDetail />} />
          </Route>
          <Route path='bank' element={<OutletPage />} >
            <Route path=':bankName' element={<OutletPage />} >
              <Route index element={<StateDetailRoute />} />
              <Route path=':stateName' element={<OutletPage />} >
                <Route index element={<DistrictDetailRoute />} />
                <Route path=':districtName' element={<OutletPage />} >
                  <Route index element={<BranchDetailRoute />} />
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
      <Footer />
    </>
  )
}

export default App
