import { PropsWithChildren } from 'react'
import { CssBaseline } from '@mui/material'
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles'
import { getDesignTokens } from './palette'
import { components } from './components'

const ThemeProvider = ({ children }: PropsWithChildren) => {
  // TODO: Сделать переключение темы
  const mode = 'light'

  const theme = createTheme({
    palette: getDesignTokens(mode),
    components,
    shape: { borderRadius: 5 },
  })

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </MUIThemeProvider>
  )
}

export default ThemeProvider
