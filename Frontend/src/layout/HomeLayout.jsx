import React from 'react'
import { Header,Footer } from '../resource'
import { Outlet } from 'react-router-dom'

function HomeLayout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default HomeLayout