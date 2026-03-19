import React from 'react'
import { Footer, HeaderOwner, useAuth } from '../resource'
import { Outlet } from 'react-router-dom'

function OwnerHomeLayout() {
  
  
  return (
    <>
    <HeaderOwner/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default OwnerHomeLayout