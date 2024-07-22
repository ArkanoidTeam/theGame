import React from 'react'
import { Switch, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../store/theme'
import { RootState } from '../../store'
import { saveUserTheme } from '../../api/AppApiTheme'

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.theme)

  const handleToggle = async () => {
    const user = JSON.parse(localStorage.getItem('userData') || '')
    const newTheme = theme === 'light' ? 'dark' : 'light'
    dispatch(setTheme(newTheme))
    const newThemeId = newTheme === 'light' ? 1 : 2
    await saveUserTheme(user.id, newThemeId)
  }

  const tooltipTitle =
    theme === 'light' ? 'Включить темную тему' : 'Включить светлую тему'

  return (
    <Tooltip title={tooltipTitle}>
      <Switch onChange={handleToggle} checked={theme !== 'light'} />
    </Tooltip>
  )
}

export default ThemeToggle
