import { Components, Theme } from '@mui/material'
import HelveticaNeueLight from '../assets/fonts/helvetica-neue-5/HelveticaNeueLight.otf'
import HelveticaNeueRoman from '../assets/fonts/helvetica-neue-5/HelveticaNeueRoman.otf'
import HelveticaNeueMedium from '../assets/fonts/helvetica-neue-5/HelveticaNeueMedium.otf'
import HelveticaNeueBold from '../assets/fonts/helvetica-neue-5/HelveticaNeueBold.otf'

export const fontFamily = 'HelveticaNeue5'

export const components: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: `
      @font-face {
        font-family: ${fontFamily};
        font-weight: 300;
        src: url(${HelveticaNeueLight}) format('opentype');
      }

      @font-face {
        font-family: ${fontFamily};
        font-weight: 400;
        src: url(${HelveticaNeueRoman}) format('opentype');
      }

      @font-face {
        font-family: ${fontFamily};
        font-weight: 500;
        src: url(${HelveticaNeueMedium}) format('opentype');
      }

      @font-face {
        font-family: ${fontFamily};
        font-weight: 700;
        src: url(${HelveticaNeueBold}) format('opentype');
      }
    `,
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained',
    },
    styleOverrides: {
      text: {
        fontWeight: 400
      }
    }
  },
}
