import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, DialogActions } from '@mui/material'
import { Modal } from '../../components'

const GameOverDialog: FC = () => {
  const navigate = useNavigate()

  const [isOpen, setOpen] = useState(false)

  const handleStart = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
    navigate('/')
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleCancel}
      title="Поздравляем!"
      content="Уровень пройден"
      footerButtons={
        <DialogActions>
          <Button variant="contained" onClick={handleStart} autoFocus>
            Следующий уровень
          </Button>
          <Button variant="contained" onClick={handleCancel}>
            Выйти
          </Button>
        </DialogActions>
      }
    />
  )
}

export default GameOverDialog
