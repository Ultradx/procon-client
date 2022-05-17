import React, { useState } from 'react'
import './header.css'
import Logo from '../../assets/procon.jpg'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
import useAuth from '../../hooks/useAuth'

const Header = () => {
  const navigate = useNavigate()
  const logout = useLogout()
  const [active, setActive] = useState('home')
  const { auth } = useAuth()

  const signOut = async (e) => {
    e.preventDefault()
    await logout()
    navigate('/')
  }

  return (
    <div className="header">
      <div className="header-left">
        <a
          className="header-logo"
          onClick={(e) => {
            e.preventDefault()
            navigate('/')
          }}
        >
          <img src={Logo} />
        </a>
      </div>
      <div className="header-center">
        <div
          className={`header-center-item ${active == 'home' ? 'active' : ''}`}
          onClick={() => {
            setActive('home')
            navigate('/')
          }}
        >
          Home
        </div>
        <div
          className={`header-center-item ${active == 'create' ? 'active' : ''}`}
          onClick={() => {
            setActive('create')
            navigate('/new')
          }}
        >
          Create
        </div>
        <div
          className={`header-center-item ${active == 'update' ? 'active' : ''}`}
          onClick={() => {
            setActive('update')
            navigate('/update')
          }}
        >
          Update
        </div>
        <div
          className={`header-center-item ${active == 'delete' ? 'active' : ''}`}
          onClick={() => {
            setActive('delete')
            navigate('/delete')
          }}
        >
          Delete
        </div>
      </div>
      <header className="header-right">
        {auth?.username ? (
          <div
            className="header-right-item"
            onClick={(e) => {
              signOut(e)
            }}
          >
            Sign Out
          </div>
        ) : (
          <div
            className="header-right-item"
            onClick={(e) => {
              e.preventDefault()
              navigate('/login')
            }}
          >
            Login
          </div>
        )}

        <div className="header-right-item">
          <BsThreeDotsVertical />
        </div>
      </header>
    </div>
  )
}

export default Header
