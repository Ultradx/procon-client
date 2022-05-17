import React from 'react'
import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    try {
      const response = await axios.get('/refresh', {
        withCredentials: true,
      })
      if (response.status === 200) {
        setAuth(response.data)
        return refresh.data
      }
    } catch (error) {
      console.log(error);
    }
  }
  return refresh
}

export default useRefreshToken
