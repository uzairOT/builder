import React from 'react'
import Navbar from '../NavBar/Navbar'
import GetInTouch from '../ContactForm/GetInTouch'
import StatsAndDownload from '../Statistics/StatsAndDownload'
import Footer from '../Footer/Footer'
import PrivacyPolicy from './PrivacyPolicy'

export default function PolicyPage() {
  return (
    <>
    <Navbar/>
    <PrivacyPolicy/>
    <GetInTouch/>
    <StatsAndDownload/>
    <Footer/>
    </>
  )
}
