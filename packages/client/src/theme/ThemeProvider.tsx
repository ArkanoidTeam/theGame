import { PropsWithChildren } from 'react'
import { CssBaseline } from '@mui/material'
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { getDesignTokens } from './palette'
import { components, fontFamily } from './components'

declare module '@mui/material/styles/createPalette' {
  type TLayout = {
    fontColor: string
    pageBackgroundColor: string
    headerAndFooterBackgroundColor: string
    pageContentBackgroundColor: string
  }

  interface Palette {
    layout: TLayout
  }

  interface PaletteOptions {
    layout: TLayout
  }
}

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const mode = useSelector((state: RootState) => state.theme.theme)

  const palette = getDesignTokens(mode)

  const theme = createTheme({
    typography: {
      fontFamily,
      allVariants: {
        color: palette.layout.fontColor,
      },
      h2: {
        fontWeight: 400,
      },
      h4: {
        fontWeight: 300,
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
