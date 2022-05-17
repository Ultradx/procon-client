import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import './login.css'

const Login = () => {
  const navigate = useNavigate()
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
        <h1>CREATE YOUR ACCOUNT</h1>
        <div className="login-fields">
          <input type="username" className="username" placeholder="Username" />
          <input
            type="password"
            className="password"
            placeholder="* * * * * *"
          />
          <button>CREATE</button>
          <a
            onClick={(e) => {
              e.preventDefault()
              navigate('/login')
            }}
          >
            Already Have Account?
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
