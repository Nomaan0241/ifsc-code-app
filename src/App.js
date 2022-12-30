import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReduxStore from './Middlewares/ReduxStore/ReduxStore';
import Navbar from './Layouts/Navbar'
import MainHome from './Pages/Home/MainHome'
import Footer from './Layouts/Footer'
import About from './Pages/Home/About'
import Contact from './Pages/Home/Contact'
import TermCondition from './Pages/Home/TermCondition'
import Disclaimer from './Pages/Home/Disclaimer'
import PageNotFound from './Pages/Home/PageNotFound'
import OutletPage from './Pages/Extra/OutletPage'
import StateDetailRoute from './Pages/BankDetailRoutes/StateDetailRoute'
import DistrictDetailRoute from './Pages/BankDetailRoutes/DistrictDetailRoute'
import BranchDetailRoute from './Pages/BankDetailRoutes/BranchDetailRoute'
import IfscFullDetail from './Pages/FullDetailPage/IfscFullDetail'
import BankFullDetail from './Pages/FullDetailPage/BankFullDetail'
import MicrFullDetail from './Pages/FullDetailPage/MicrFullDetail'
import FindByIFSC from './Pages/Home/FindByIFSC'
import FindByMICR from './Pages/Home/FindByMICR'
import IsLoading from './Components/IsLoading';

function App() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  })
  return (
    <>
      <Provider store={ReduxStore}>
        <IsLoading />
        <Navbar />
        <Routes>
          <Route path='/' element={<OutletPage />}>
            <Route index element={<MainHome />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='find-by-ifsc' element={<FindByIFSC />} />
            <Route path='find-by-micr' element={<FindByMICR />} />
            <Route path='ifsc' element={<OutletPage />}>
              <Route path=':ifscCodeSlug' element={<BankFullDetail />} />
            </Route>
            <Route path='micr' element={<OutletPage />}>
              <Route path=':micrCodeSlug' element={<MicrFullDetail />} />
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
      </Provider>
    </>
  )
}

export default App
