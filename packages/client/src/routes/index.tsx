import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Page } from '../utils/constants/navigation'
import { Main } from '../pages/main'

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={Page.MAIN} element={<Main />} />
      <Route path={Page.ARKANOID} element={<div>Arkanoid</div>} />
      <Route path={Page.SIGNIN} element={<div>login</div>} />
      <Route path={Page.SIGNUP} element={<div>signup</div>} />
      <Route path={Page.PROFILE} element={<div>profile</div>} />
      <Route path={Page.UNAVAILABLE} element={<div>500</div>} />
      <Route path={Page.NOT_FOUND} element={<div>404</div>} />
      <Route path={Page.LEADERBOARD} element={<div>leaderboard</div>} />
    </Routes>
  )
}

export default AppRoutes
