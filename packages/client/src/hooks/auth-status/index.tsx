import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { YandexApiAuth } from '../../api/YandexApiAuth'
import { YandexApiOAuth } from '../../api/YandexApiOAuth'
import { useAppDispatch } from '../../hooks/use-app-dispatch'
import { YANDEX_OAUTH_REDIRECT_URI } from '../../utils/constants/api'
import { login as loginLayer } from '../../store/auth'
import { apiAuth } from '../../utils/apiAuth'
export const useAuth = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const code = searchParams.get('code')

        if (code) {
          await YandexApiOAuth.signin({
            code,
            redirect_uri: YANDEX_OAUTH_REDIRECT_URI,
          })
          const { data: userData } = await YandexApiAuth.user()

          dispatch(
            loginLayer({
              isAuth: true,
              user: {
                name: userData.login,
              },
              accessToken: null,
            })
          )
          if (typeof window !== 'undefined') {
            localStorage.setItem('userData', JSON.stringify(userData))
            setSearchParams({})
          }
        } else {
          const { data: userData } = await YandexApiAuth.user()
          if (typeof window !== 'undefined') {
            localStorage.setItem('userData', JSON.stringify(userData))
          }
        }

        setIsAuth(true)
      } catch (error) {
        const err = error as Record<
          string,
          Record<string, Record<string, unknown>>
        >

        if (err.response.data.reason === 'User already in system') {
          setIsAuth(true)
        } else setIsAuth(false)
      } finally {
        apiAuth()
      }
    }

    checkAuth()
  }, [])

  return { isAuth }
}
