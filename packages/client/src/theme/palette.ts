import { type PaletteMode } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

export const getDesignTokens = (mode: PaletteMode): PaletteOptions => ({
  mode,
  ...(mode === 'light'
    ? {
        primary: {
          main: '#3968DA',
        },
      }
    : {}),
})
