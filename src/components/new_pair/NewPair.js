import axios from '../../api/axios'
import React, { useState } from 'react'
import Header from '../header/Header'
import './new_pair.css'
import toast, { Toaster } from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'


const NewPair = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [rate, setRate] = useState('')
  // const [answer, setAnswer] = useState('')
  const { setAuth } = useAuth()



  const sendData = async (e) => {
    e.preventDefault()
    let response
    const toastId = toast.loading('Adding...')
    console.log(from, to);
    try {
      if (from != '' && to != '' && rate != '') {
        response = await axios.post(
          `/new`,
          {
            from: from,
            to: to,
            rate: rate,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        )
      } else {
        toast.error('Please Fill All The Inputs!', {
          id: toastId,
        })
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(error.response.data, {
          id: toastId,
        })
        setAuth({})
      } else if (error.response.status === 405) {
        toast.error(error.response.data, {
          id: toastId,
        })
      }
    }
    if (response.status === 200) {
      toast.success(response.data, {
        id: toastId,
      })
      // setAnswer(response.data)
    }
  }
  return (
    <div className="newPair">
      <Header />
      <div className="newPairContainer">
        <h2>Add New Pair</h2>
        <div className="add-container">
          <div className="add-inner-container">
            <label htmlFor="amount">From</label>
            <div className="input-container">
              <input
                type="text"
                className="add-input"
                placeholder="Pair 1.."
                pattern="^[0-9]*[.,]?[0-9]*$"
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
          </div>
          <div className="add-inner-container">
            <label htmlFor="amount">To</label>
            <div className="input-container">
              <input
                type="text"
                className="add-input"
                placeholder="Pair 2.."
                pattern="^[0-9]*[.,]?[0-9]*$"
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>
          <div className="add-inner-container">
            <label htmlFor="amount">Ratio</label>
            <div className="input-container">
              <input
                type="text"
                className="add-input"
                placeholder="0.0"
                pattern="^[0-9]*[.,]?[0-9]*$"
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
          </div>
          <button className="add-button" onClick={sendData}>
            Add
          </button>
        </div>
        {/* <label className="answer-label" htmlFor="answer">
          {answer}
        </label> */}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default NewPair
