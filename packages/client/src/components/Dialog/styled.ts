import styled from '@emotion/styled'
import { Dialog as WUIDialog } from '@mui/material'

interface StyledDialogProps {
  width?: number
  height?: number
}

export const StyledDialog = styled(WUIDialog)<StyledDialogProps>`
  .MuiDialog-paper {
    width: ${({ width }) => (width ? `${width}px` : 'auto')};
    height: ${({ height }) => (height ? `${height}px` : 'auto')};
  }
`
