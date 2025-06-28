import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

function ProtectedRoute({ children, requireAuth = true }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" />
  }

  if (!requireAuth && user) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute
