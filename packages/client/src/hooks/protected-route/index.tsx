import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth-status/index'
import { Page } from '../../utils/constants/navigation'

interface ProtectedRouteProps {
  element: JSX.Element
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuth } = useAuth()
  return isAuth ? element : <Navigate to={`/${Page.SIGNIN}`} replace />
}
