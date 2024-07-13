import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import store from './store'
import AppRoutes from './routes'
import { ThemeProvider } from './theme'
import { setTheme } from './store/theme'

const router = createBrowserRouter(AppRoutes)

function loadDefaultTheme() {
  // логика получения темы с сервера в рамках задачи ARK-90
  const theme: 'light' | 'dark' = 'light'
  return theme
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const defaultTheme = loadDefaultTheme()
    dispatch(setTheme(defaultTheme))
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
