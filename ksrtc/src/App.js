import React from 'react'
import ULogin from './Components/User/ULogin'
import ALogin from './Components/Admin/ALogin'
import Dashboard from './Components/User/Dashboard'
import TBooking from './Components/User/TBooking'
import TVerification from './Components/User/TVerification'
import AccidentReport from './Components/User/AccidentReport'
import Rrt from './Components/User/Rrt'
import ADashboard from './Components/Admin/ADashboard'
import ManageUsers from './Components/Admin/ManageUsers'
import AdminAlerts from './Components/Admin/AdminAlerts'
import TicketDetails from './Components/User/TicketDetails'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ULogin/>}/>
          <Route path='/admin' element={<ALogin/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/tbooking' element={<TBooking/>}/>
          <Route path='/tverification' element={<TVerification/>}/>
          <Route path='/accidentreport' element={<AccidentReport/>}/>
          <Route path='/rrt' element={<Rrt/>}/>
          <Route path='/adashboard' element={<ADashboard/>}/>
          <Route path='/manageusers' element={<ManageUsers/>}/>
          <Route path='/adminalerts' element={<AdminAlerts/>}/>
          <Route path='/ticketdetails' element={<TicketDetails/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App