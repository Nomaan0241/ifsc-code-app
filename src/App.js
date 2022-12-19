import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Layouts/Navbar'
import Home from './Pages/Home/Home'
import Footer from './Layouts/Footer'
import Loader from './Layouts/Loader'
import About from './Pages/Home/About'
import Contact from './Pages/Home/Contact'
import TermCondition from './Pages/Home/TermCondition'
import Disclaimer from './Pages/Home/Disclaimer'
import PageNotFound from './Pages/Home/PageNotFound'
import OutletPage from './Pages/Extra/OutletPage'
import IfscFullDetail from './Pages/IfscFullDetail'
import StateDetailRoute from './Pages/BankDetailRoutes/StateDetailRoute'
import DistrictDetailRoute from './Pages/BankDetailRoutes/DistrictDetailRoute'
import BranchDetailRoute from './Pages/BankDetailRoutes/BranchDetailRoute'
import BankFullDetail from './Pages/BankFullDetail'
import FindByIFSC from './Pages/Home/FindByIFSC'
import FindByMICR from './Pages/Home/FindByMICR'

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
          <Route path='find-by-ifsc' element={<FindByIFSC />} />
          <Route path='find-by-micr' element={<FindByMICR />} />
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
          <Route path='disclaimer' element={<Disclaimer />} />
          <Route path='terms-of-uses' element={<TermCondition />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
