import { type PaletteMode } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

export const getDesignTokens = (mode: PaletteMode): PaletteOptions => ({
  mode,
  ...(mode === 'light'
    ? {
      primary: {
        main: '#3968DA',
      },
      layout: {
        fontColor: '#273443',
        pageBackgroundColor: '#F3F8FE',
        headerAndFooterBackgroundColor: '#E9F3FF'
      },
    }
    : { // TODO: добавить стили для темной темы
      primary: {
        main: '#3968DA',
      },
      layout: {
        fontColor: '#273443',
        pageBackgroundColor: '#F3F8FE',
        headerAndFooterBackgroundColor: '#E9F3FF'
      },
    }),
})
