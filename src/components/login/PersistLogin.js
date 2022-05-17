import { Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useAxiosPrivate()
  const { auth } = useAuth()

  useEffect(() => {
    let isMounted = true
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error(err)
      } finally {
        isMounted && setIsLoading(false)
      }
    }
    verifyRefreshToken()

    !auth?.username ? verifyRefreshToken() : setIsLoading(false)

    return () => (isMounted = false)
  }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`accessToken: ${auth?.token}`)
  }, [isLoading])
  return <div>{isLoading ? <p>Loading...</p> : <Outlet />}</div>
}

export default PersistLogin
