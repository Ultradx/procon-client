import React, { useEffect, useState } from 'react'
import './currencyConverter.css'
import axios from '../../api/axios'

const CurrencyConverter = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currencies, setCurrencies] = useState([])
  const [ratio, setRatio] = useState('')
  const [fromValue, setFromValue] = useState('EURO')
  const [toValue, setToValue] = useState('EURO')
  const [amountValue, setAmountValue] = useState('')

  const sendData = (e) => {
    e.preventDefault()
    console.log(fromValue, toValue, amountValue)
  }

  const getCurrencies = async () => {
    setIsLoading(true)
    const response = await axios.get('/currencies')
    if (response.status === 200) {
      setCurrencies(response.data)
      setIsLoading(false)
    }
  }

  const getConvertedValue = async (e) => {
    e.preventDefault()
    let response
    if (amountValue != '') {
      response = await axios.post(`/rates`, {
        amount: amountValue,
        from: fromValue,
        to: toValue,
      })
    }

    if (response.status === 200) {
      setRatio(response.data)
    }
  }

  useEffect(() => {
    console.log('test')
    getCurrencies()
  }, [])

  return (
    <div className="currencyConverter">
      {!isLoading ? (
        <div className="content">
          <div className="formHeader">
            <div>Convert</div>
          </div>
          <div className="transferPropContainerOut">
            <div className="transferPropContainerIn">
              <label htmlFor="amount">Amount</label>
              <div className="transferPropContainer">
                <input
                  type="text"
                  className="transferPropInput"
                  placeholder="0.0"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  onChange={(e) => setAmountValue(e.target.value)}
                />
              </div>
            </div>
            <div className="transferPropContainerIn">
              <label htmlFor="amount">From</label>
              <div className="transferPropContainer">
                <select
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  className="selectPropInput"
                >
                  {currencies.map((currency) => (
                    <option className="selectPropInputOption" value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="transferPropContainerIn">
              <label htmlFor="amount">To</label>
              <div className="transferPropContainer">
                <select
                  value={toValue}
                  onChange={(e) => setToValue(e.target.value)}
                  className="selectPropInput"
                >
                  {currencies.map((currency) => (
                    <option className="selectPropInputOption" value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* <div className="currencySelector">
            <div className="currencySelectorContent">
              <div className="currencySelectorIcon">
              </div>
              <div className="currencySelectorTicker">ETH</div>
            </div>
          </div> */}

          <div className="confirmButton" onClick={getConvertedValue}>
            Confirm
          </div>
          <div className="result">
            <h2>{ratio}</h2>
          </div>
        </div>
      ) : (
        'Wait'
      )}
    </div>
  )
}

export default CurrencyConverter
