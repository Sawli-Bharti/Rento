import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import {RenterHome,OwnerHome,Properties,Login,SignUp, HomeLayout,OwnerHomeLayout, PropertBySearch,PropertyDetails, AdminLayout, Dashboard, Users, OwnerList, RenterList, OwnerDashboardLayout, OwnerDashboard, MyProperties, OwnerKyc, RenterDashboardLayout, RenterOverview, PendingKycList, AdminKycView,MyAppointments,MyBookings,SavedProperties,Security,Profile, Appointments,MyRentals,RentalHistory,Bookings} from './resource';
import AddProperty from './pages/owner/AddProperty';

function App() {
 


  return (
    <>
    
      <Routes>
        <Route element={<HomeLayout/>}>
          <Route path="/" element={<RenterHome/>} />
        <Route path="/properties" element={<Properties/>} />
        <Route path="/blogs" element={<h1>Blogs</h1>} />
        <Route path='/search' element={<PropertBySearch/>}/>
        <Route path='/property' element={<PropertyDetails/>}/>

        </Route>
        
        
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />

        <Route path="/renter" element={<RenterDashboardLayout />}>
  <Route index element={<RenterOverview />} />
  <Route path="bookings" element={<MyBookings />} />
  <Route path="my-appointments" element={<MyAppointments />} />
  <Route path="saved" element={<SavedProperties />} />
  <Route path="rentals" element={<MyRentals />} />
  <Route path="rental-history/:rentalId" element={<RentalHistory />} />
  <Route path="profile" element={<Profile />} />
  <Route path="security" element={<Security />} />
</Route>


        {/* Owner Routes   */}
        <Route element={<OwnerHomeLayout/>}>
          <Route path="/owner" element={<OwnerHome/>} />
          <Route  path="/owner/login" element={<Login/>} />
        <Route path="/owner/signup" element={<SignUp role={"OWNER"}/>} />
        
        </Route>
        {/* ownredashboard */}
        <Route path='/o-wner' element={<OwnerDashboardLayout/>}>
          <Route path='dashboard' element={<OwnerDashboard/>}/>
          <Route path='properties' element={<MyProperties/>}/>
          <Route path='kyc' element={<OwnerKyc/>}/>
          <Route path='add-property' element={<AddProperty/>}/>
          <Route path='appointments' element={<Appointments/>}/>
          <Route path='bookings' element={<Bookings/>}/>
          
          

        </Route>
    {/* admin routes */}
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="users" element={<Users/>}/>
          <Route path="owner-list" element={<OwnerList/>}/>
          <Route path="renter-list" element={<RenterList/>}/>
          <Route path='allProperties' element={<Properties/>}/>
          <Route path='pending-kyc-list' element={<PendingKycList/>}/>
          <Route path='kyc/:ownerId' element={<AdminKycView/>}/>
          
          </Route>
      </Routes>
    </>
      
    
  )
}

export default App
