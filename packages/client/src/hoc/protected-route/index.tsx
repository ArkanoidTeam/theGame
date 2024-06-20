import { FC, useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'

import { Page } from '../../utils/constants/navigation'
import { useAuth } from '../../hooks/auth-status'
import { YandexApiOAuth } from '../../api/YandexApiOAuth'
import { YANDEX_OAUTH_REDIRECT_URI } from '../../utils/constants/api'
import { YandexApiAuth } from '../../api/YandexApiAuth'
import { useAppDispatch } from '../../hooks/use-app-dispatch'
import { login as loginLayer } from '../../store/auth'

interface ProtectedRouteProps {
  element: JSX.Element
  isCheckOAuth?: boolean
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element, isCheckOAuth }) => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')

    if (!isCheckOAuth || !code) {
      return
    }

    async function signin(code: string) {
      await YandexApiOAuth.signin({
        code,
        redirect_uri: YANDEX_OAUTH_REDIRECT_URI,
      })
      const { data: userData } = await YandexApiAuth.user()

      console.log(code)
      console.log(userData)

      dispatch(
        loginLayer({
          isAuth: true,
          user: {
            name: userData.login,
          },
          accessToken: null,
        })
      )
    }

    signin(code)
  }, [])

  const { isAuth } = useAuth()
  console.log(isAuth)
  return isAuth ? element : <Navigate to={`/${Page.SIGNIN}`} replace />
}

export default ProtectedRoute
