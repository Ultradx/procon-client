import React, { useState } from 'react'
import './login.css'
import { AiOutlineClose } from 'react-icons/ai'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {
  const LOGIN_URL = '/login'
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setAuth } = useAuth()

  const authUser = async () => {
    let response
    const toastId = toast.loading('Loading...')
    try {
      if (username != '' && password != '') {
        response = await axios.post(
          `/login`,
          JSON.stringify({ username, password }),

          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        )
      }
      if (response.status === 200) {
        console.log(response.data)
        const token = response?.data?.token
        const username = response?.data?.username
        setAuth({ username, token })
        toast.success('Welcome', {
          id: toastId,
        })
        navigate(from, { replace: true })
      }
    } catch (error) {
      console.log(error.response.data)
      toast.error(error.response.data, {
        id: toastId,
      })
    }
  }
  return (
    <div className="login">
      <div className="container">
        <AiOutlineClose
          className="back-button"
          onClick={(e) => {
            e.preventDefault()
            navigate('/')
          }}
        />
        <h1>SIGN IN TO YOUR ACCOUNT</h1>
        <div className="login-fields">
          <input
            type="username"
            className="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="password"
            placeholder="* * * * * *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault()
              authUser()
            }}
          >
            SIGN IN
          </button>
          <a
            onClick={(e) => {
              e.preventDefault()
              navigate('/signup')
            }}
          >
            Dont Have Account?
          </a>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default Login
