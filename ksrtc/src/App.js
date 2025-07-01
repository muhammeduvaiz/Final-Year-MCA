import React from 'react'
import ULogin from './Components/User/ULogin'
import ALogin from './Components/Admin/ALogin'
import RLogin from './Components/Rrt/RLogin'
import Dashboard from './Components/User/Dashboard'
import TBooking from './Components/User/TBooking'
import TVerification from './Components/User/TVerification'
import AccidentReport from './Components/User/AccidentReport'
import Rrt from './Components/User/Rrt'
import ADashboard from './Components/Admin/ADashboard'
import ManageUsers from './Components/Admin/ManageUsers'
import ManageRrt from './Components/Admin/ManageRrt'
import AdminAlerts from './Components/Admin/AdminAlerts'
import TicketDetails from './Components/User/TicketDetails'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ULogin/>}/>
          <Route path='/admin' element={<ALogin/>}/>
          <Route path='/rrt-login' element={<RLogin/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/tbooking' element={<TBooking/>}/>
          <Route path='/tverification' element={<TVerification/>}/>
          <Route path='/accidentreport' element={<AccidentReport/>}/>
          <Route path='/rrt' element={<Rrt/>}/>
          <Route path='/adashboard' element={<ADashboard/>}/>
          <Route path='/manageusers' element={<ManageUsers/>}/>
          <Route path='/managerrt' element={<ManageRrt/>}/>
          <Route path='/adminalerts' element={<AdminAlerts/>}/>
          <Route path='/ticketdetails' element={<TicketDetails/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App