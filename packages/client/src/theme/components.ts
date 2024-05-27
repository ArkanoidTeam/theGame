import { Components, Theme } from '@mui/material'
import HelveticaNeueLight from '../assets/fonts/helvetica-neue-5/HelveticaNeueLight.otf'
import HelveticaNeueMedium from '../assets/fonts/helvetica-neue-5/HelveticaNeueMedium.otf'
import HelveticaNeueBold from '../assets/fonts/helvetica-neue-5/HelveticaNeueBold.otf'

export const fontFamily = 'HelveticaNeue5'

export const components: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: `
      @font-face {
        font: {
            family: ${fontFamily};
            weight: 300;
        }
        src: url(${HelveticaNeueLight}) format('opentype');
      }

      @font-face {
        font: {
            family: ${fontFamily};
            weight: 500;
        }
        src: url(${HelveticaNeueMedium}) format('opentype');
      }

      @font-face {
        font: {
            family: ${fontFamily};
            weight: 700;
        }
        src: url(${HelveticaNeueBold}) format('opentype');
      }
    `,
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained',
    },
  },
}
