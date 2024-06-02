import { useEffect, useState } from 'react'
import { YandexApiAuth } from '../../api/YandexApiAuth'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await YandexApiAuth.user()
        setIsAuth(true)
      } catch (error) {
        setIsAuth(false)
      }
    }

    checkAuth()
  }, [])

  return { isAuth }
}
