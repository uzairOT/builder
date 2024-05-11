import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const NavbarLayout = ({getFormattedEvents}) => {
 
  
  return (
    <>
        <header >
        <Navbar  />
        </header>
        <Outlet />
    </>
  )
}

export default NavbarLayout
