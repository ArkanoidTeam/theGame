import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Page } from '../utils/constants/navigation'
import { View, ViewGroup } from '../data/navigation'
import { Main } from '../pages/main'

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={Page.MAIN} element={<Main />}>
        <Route path={ViewGroup.Games.uri}>
          <Route path={View.Arkanoid.uri} element={<div>Arkanoid</div>} />
        </Route>
      </Route>

      <Route path={Page.LOGIN} element={<div>login</div>} />
      <Route path={Page.UNAVAILABLE} element={<div>500</div>} />
      <Route path={Page.NOT_FOUND} element={<div>404</div>} />
    </Routes>
  )
}

export default AppRoutes
