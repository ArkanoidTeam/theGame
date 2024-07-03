import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { Page } from '../../utils/constants/navigation'
import { useAuth } from '../../hooks/auth-status'

interface ProtectedRouteProps {
  element: JSX.Element
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuth } = useAuth()
  return isAuth ? element : <Navigate to={`/${Page.SIGNIN}`} replace />
}

export default ProtectedRoute
