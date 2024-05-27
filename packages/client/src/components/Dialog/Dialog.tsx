import React from 'react'
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import { StyledDialog } from './styled'

interface ModalComponentProps {
  isOpen: boolean
  width?: number
  height?: number
  title: string
  content: string
  onClose: () => void
  onConfirm: () => void
}

const Dialog: React.FC<ModalComponentProps> = ({
  isOpen,
  width = 600,
  height = 400,
  title,
  content,
  onClose,
  onConfirm,
}) => {
  return (
    <StyledDialog open={isOpen} width={width} height={height}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onConfirm} autoFocus>
          К игре
        </Button>
        <Button onClick={onClose}>Отмена</Button>
      </DialogActions>
    </StyledDialog>
  )
}

export default Dialog
