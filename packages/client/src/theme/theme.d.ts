declare module '@mui/material/styles/createPalette' {
  type TLayout = {
    fontColor: string
    pageBackgroundColor: string
    headerAndFooterBackgroundColor: string
  }

  interface Palette {
    layout: TLayout
  }

  interface PaletteOptions {
    layout: TLayout
  }
}
