import { Page } from '../utils/constants/navigation'
import * as Pages from '../pages'
import ErrorBoundary from '../hoc/error-boundary'
import ProtectedRoute from '../hoc/protected-route'

const AppRoutes = [
  {
    path: Page.UNAVAILABLE,
    element: <ProtectedRoute element={<Pages.Unavailable />} />,
  },
  {
    path: Page.NOT_FOUND,
    element: <Pages.NotFound />,
  },
  {
    path: Page.MAIN,
    element: (
      <ProtectedRoute
        element={
          <ErrorBoundary>
            <Pages.Main />
          </ErrorBoundary>
        }
      />
    ),
  },
  {
    path: Page.SIGNIN,
    element: <Pages.Signin />,
  },
  {
    path: Page.SIGNUP,
    element: <Pages.Signup />,
  },
  {
    path: Page.PROFILE,
    element: (
      <ProtectedRoute
        element={
          <ErrorBoundary>
            <Pages.Profile />
          </ErrorBoundary>
        }
      />
    ),
  },
  {
    path: Page.LEADERBOARD,
    element: <ProtectedRoute element={<Pages.Leaderboard />} />,
  },
  {
    path: Page.FORUM,
    element: <ProtectedRoute element={<Pages.Forum />} />,
  },
  {
    path: Page.ARKANOID,
    element: (
      <ProtectedRoute
        element={
          <ErrorBoundary>
            <Pages.Arkanoid />
          </ErrorBoundary>
        }
      />
    ),
  },
  {
    path: Page.FORUM_THEME,
    element: <ProtectedRoute element={<Pages.ForumTheme />} />,
  },
].map(item => ({ ...item }))

export default AppRoutes
