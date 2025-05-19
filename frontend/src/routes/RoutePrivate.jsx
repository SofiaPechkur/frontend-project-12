import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { routes } from './routes.js'

const RoutePrivate = ({ children }) => {
  const authState = useSelector(state => state.auth)
  const navigate = useNavigate()
  if (!authState.isAuthenticated) {
    navigate(routes.login)
    return null
  }
  return children
}

export default RoutePrivate
