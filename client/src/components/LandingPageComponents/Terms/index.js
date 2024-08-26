import React from 'react'
import Navbar from '../NavBar/Navbar'
import TermsAndConditions from './Terms'
import GetInTouch from '../ContactForm/GetInTouch'
import StatsAndDownload from '../Statistics/StatsAndDownload'
import Footer from '../Footer/Footer'

export default function TermsPage() {
  return (
    <>
    <Navbar/>
    <TermsAndConditions/>
    <GetInTouch/>
    <StatsAndDownload/>
    <Footer/>
    </>
  )
}
