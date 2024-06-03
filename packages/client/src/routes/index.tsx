import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Page } from '../utils/constants/navigation'
import * as Pages from '../pages'
import ErrorBoundary from '../hoc/error-boundary'

const AppRoutes: FC = () => {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path={Page.MAIN} element={<Pages.Main />} />
          <Route path={Page.ARKANOID} element={<Pages.Arkanoid />} />
          <Route path={Page.SIGNIN} element={<Pages.Signin />} />
          <Route path={Page.SIGNUP} element={<Pages.Signup />} />
          <Route path={Page.PROFILE} element={<Pages.Profile />} />
          <Route path={Page.UNAVAILABLE} element={<Pages.Unavailable />} />
          <Route path={Page.NOT_FOUND} element={<Pages.NotFound />} />
          <Route path={Page.LEADERBOARD} element={<Pages.Leaderboard />} />
          <Route path={Page.FORUM} element={<Pages.Forum />} />
          <Route path={Page.FORUM_THEME} element={<Pages.ForumTheme />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}

export default AppRoutes
