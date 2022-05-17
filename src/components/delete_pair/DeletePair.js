import axios from '../../api/axios'
import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import './delete_pair.css'
import toast, { Toaster } from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'


const DeletePair = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [rate, setRate] = useState('')
  // const [answer, setAnswer] = useState('')
  const [pairs, setPairs] = useState([])
  const { setAuth } = useAuth()


  useEffect(() => {
    getPairs()
  }, [pairs])

  const sendData = async (e, from, to) => {
    e.preventDefault()
    let response
    const toastId = toast.loading('Deleting...')
    try {
      if (from != '' && to != '') {
        response = await axios.delete(`/delete`, {
          data: {
            from: from,
            to: to,
          },

          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
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
      // setAnswer(response.data)
      toast.success(response.data, {
        id: toastId,
      })
    }
  }

  const getPairs = async () => {
    let response
    response = await axios.get(`/pairs`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    if (response.status === 200) {
      setPairs(response.data)
    }
  }

  return (
    <div className="deletePair">
      <Header />
      <div className="deletePairContainer">
        <h2>Delete Pair</h2>

        <div className="delete-scroll-bg">
          {pairs.length > 0 ? (
            pairs.map((pair) => (
              <div className="delete-pairs">
                <h3>{`${pair.from} -> ${pair.to} (${pair.rate})`}</h3>
                <button
                  onClick={(e) => sendData(e, pair.from, pair.to)}
                  className="get-button"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <h2>No Pairs Found</h2>
          )}
        </div>
        {/* <label className="answer-label" htmlFor="answer">
          {answer}
        </label> */}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default DeletePair
