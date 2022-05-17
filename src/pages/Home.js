import React, { useEffect, useState } from 'react'
import CurrencyConverter from '../components/currency/CurrencyConverter'
import Header from '../components/header/Header'

const Home = () => {
  return (
    <div className="home">
      <Header />
      <CurrencyConverter />
    </div>
  )
}

export default Home
