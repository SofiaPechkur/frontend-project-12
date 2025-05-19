import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { routes } from './routes.js'

const RoutePrivate = ({ children }) => {
  const authState = useSelector(state => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate(routes.login)
    }
  }, [authState.isAuthenticated, navigate])
  return authState.isAuthenticated ? children : null
}

export default RoutePrivate
