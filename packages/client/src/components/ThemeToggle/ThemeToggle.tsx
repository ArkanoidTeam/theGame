import React from 'react'
import { Switch, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../store/theme'
import { RootState } from '../../store'

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.theme)

  const handleToggle = () => {
    dispatch(toggleTheme())
    // сохранение темы на бэке
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
