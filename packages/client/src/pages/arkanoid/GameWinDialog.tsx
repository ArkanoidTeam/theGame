import React, { FC, useState } from 'react'
import { Dialog } from '../../components'

const GameOverDialog: FC = () => {
  const [isOpen, setOpen] = useState(true)

  const handleStart = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleCancel}
      onConfirm={handleStart}
      title="Поздравляем!"
      content="Уровень пройден"
    />
  )
}

export default GameOverDialog
