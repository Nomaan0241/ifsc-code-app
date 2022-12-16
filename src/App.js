import { Route, Routes } from 'react-router-dom'
import Navbar from './Layouts/Navbar'
import Home from './Pages/Home/Home'
import About from './Pages/Home/About'
import Contact from './Pages/Home/Contact'
import Service from './Pages/Home/Service'
import OutletPage from './Pages/Outlets/OutletPage'
import PageNotFound from './Pages/Extra/PageNotFound'
import IfscFullDetail from './Pages/IfscFullDetail'
import StateDetailRoute from './Pages/BankDetailRoutes/StateDetailRoute'
import DistrictDetailRoute from './Pages/BankDetailRoutes/DistrictDetailRoute'
import BranchDetailRoute from './Pages/BankDetailRoutes/BranchDetailRoute'
import BankFullDetail from './Pages/BankFullDetail'
import Footer from './Layouts/Footer'
import Loader from './Layouts/Loader'
import { useSelector } from 'react-redux'

function App() {
  const loading = useSelector((state) => state.toggleState.isLoading);
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <Routes>
        <Route path='/' element={<OutletPage />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='service' element={<Service />} />
          <Route path='ifsc' element={<OutletPage />}>
            <Route path=':ifscCodeSlug' element={<BankFullDetail />} />
          </Route>
          <Route path='bank' element={<OutletPage />} >
            <Route path=':bankNameSlug' element={<OutletPage />} >
              <Route index element={<StateDetailRoute />} />
              <Route path=':stateNameSlug' element={<OutletPage />} >
                <Route index element={<DistrictDetailRoute />} />
                <Route path=':districtNameSlug' element={<OutletPage />} >
                  <Route index element={<BranchDetailRoute />} />
                  <Route path=':branchNameSlug' element={<OutletPage />} >
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
