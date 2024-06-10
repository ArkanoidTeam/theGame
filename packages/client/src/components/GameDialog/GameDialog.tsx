import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, DialogActions } from '@mui/material'
import { Modal } from '../../components'

interface GameDialogProps {
  isWin?: boolean
  isOpen: boolean
  onClose: () => void
  onRestart: () => void
}

const GameDialog: FC<GameDialogProps> = ({
  isWin = false,
  isOpen,
  onClose,
  onRestart,
}) => {
  const navigate = useNavigate()

  const handleStart = () => {
    onClose()
  }

  const handleCancel = () => {
    onClose()
    navigate('/')
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleCancel}
      title={isWin ? 'Поздравляем!' : 'Упс...'}
      footerButtons={
        <DialogActions>
          <Button variant="contained" onClick={isWin ? handleStart : onRestart}>
            {isWin ? 'Следующий уровень' : 'Повторить'}
          </Button>
          <Button variant="contained" onClick={handleCancel}>
            Выйти
          </Button>
        </DialogActions>
      }>
      {isWin ? 'Уровень пройден!' : 'Вы проиграли'}
    </Modal>
  )
}

export default GameDialog
