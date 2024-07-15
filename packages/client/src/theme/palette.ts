import { type PaletteMode } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

export const getDesignTokens = (mode: PaletteMode): PaletteOptions => ({
  mode,
  ...(mode === 'light'
    ? {
        layout: {
          fontColor: '#273443',
          pageBackgroundColor: '#F3F8FE',
          pageContentBackgroundColor: '#FFFFFF',
          headerAndFooterBackgroundColor: '#E9F3FF',
        },
      }
    : {
        layout: {
          fontColor: '#F3F8FE',
          pageBackgroundColor: '#121212',
          pageContentBackgroundColor: '#000000',
          headerAndFooterBackgroundColor: '#1E1E1E',
        },
      }),
})
