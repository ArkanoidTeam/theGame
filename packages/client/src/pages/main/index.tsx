import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Button from '@mui/material/Button'

export const Main: FC = () => {
  return (
    <main className="main">
      <h1>Главная</h1>
      <Button variant="contained">Hello world</Button>
    </main>
  )
}
