import React from 'react'
import visa from './assets/svgs/visa.svg'
import mastercard from './assets/svgs/mastercard.svg'
import unionpay from './assets/svgs/unionpay.svg'
import amex from './assets/svgs/amex.svg'

const Images = () => {
  return (
    <>
      <img src={visa} alt='visa' style={themeStyle.size}></img>
      <img src={mastercard} alt='visa' style={themeStyle.size}></img>
      <img src={unionpay} alt='visa' style={themeStyle.size}></img>
      <img src={amex} alt='visa' style={themeStyle.size}></img>
    </>
  )
}

export default Images

const themeStyle = {
    size: {
        width: '28px',
        height: '28px'
    }
}