import React from 'react'
import { Switch, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../store/theme'
import { RootState } from '../../store'
import { saveUserTheme } from '../../api/AppApiTheme'

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.theme)

  const handleToggle = async () => {
    const user = JSON.parse(localStorage.getItem('userData') || '')
    const newTheme = theme === 'light' ? 1 : 2
    dispatch(toggleTheme())
    await saveUserTheme(user.id, newTheme)
  }

  const tooltipTitle =
    theme === 'light' ? 'Включить темную тему' : 'Включить светлую тему'

  return (
    <Tooltip title={tooltipTitle}>
      <Switch onChange={handleToggle} checked={theme === 'dark'} />
    </Tooltip>
  )
}

export default ThemeToggle
