import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import store from './store'
import AppRoutes from './routes'
import { setTheme } from './store/theme'
import { ThemeProvider } from './theme'
import { fetchUserTheme } from './api/AppApiTheme'

const router = createBrowserRouter(AppRoutes)

const App = () => {
  const dispatch = useDispatch()

  const loadTheme = async () => {
    const user = JSON.parse(localStorage.getItem('userData') || '')
    const defaultTheme = await fetchUserTheme(user?.id)
    console.log(defaultTheme)
    dispatch(setTheme(defaultTheme === 1 ? 'light' : 'dark'))
  }

  useEffect(() => {
    loadTheme()
  }, [dispatch])

  return <RouterProvider router={router} />
}

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
)

function startServiceWorker() {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          )
        })
        .catch((error: string) => {
          console.log('ServiceWorker registration failed: ', error)
        })
    })
  }
}

startServiceWorker()
