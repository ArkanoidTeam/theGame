import { PropsWithChildren } from 'react'
import { CssBaseline } from '@mui/material'
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles'
import { getDesignTokens } from './palette'
import { components, fontFamily } from './components'

const ThemeProvider = ({ children }: PropsWithChildren) => {
  // TODO: Сделать переключение темы
  const mode = 'light'
  const palette = getDesignTokens(mode)

  const theme = createTheme({
    typography: {
      fontFamily,
      allVariants: {
        color: palette.layout.fontColor,
      },
    },
    palette,
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
