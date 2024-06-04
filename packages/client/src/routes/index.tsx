import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Page } from '../utils/constants/navigation'
import * as Pages from '../pages'
import ErrorBoundary from '../hoc/error-boundary'
import ProtectedRoute from '../hoc/protected-route'

const AppRoutes: FC = () => {
  return (
    <>
      <main className="main">
        <ErrorBoundary>
          <Routes>
            <Route
              path={Page.MAIN}
              element={<ProtectedRoute element={<Pages.Main />} />}
            />
            <Route
              path={Page.ARKANOID}
              element={<ProtectedRoute element={<Pages.Arkanoid />} />}
            />
            <Route path={Page.SIGNIN} element={<Pages.Signin />} />
            <Route path={Page.SIGNUP} element={<Pages.Signup />} />
            <Route
              path={Page.PROFILE}
              element={<ProtectedRoute element={<Pages.Profile />} />}
            />
            <Route
              path={Page.UNAVAILABLE}
              element={<ProtectedRoute element={<Pages.Unavailable />} />}
            />
            <Route path={Page.NOT_FOUND} element={<Pages.NotFound />} />
            <Route
              path={Page.LEADERBOARD}
              element={<ProtectedRoute element={<Pages.Leaderboard />} />}
            />
          </Routes>
        </ErrorBoundary>
      </main>
    </>
  )
}

export default AppRoutes
