import { FC, useState, ChangeEvent } from 'react'
import { Modal } from '../../../../components'
import { Box, Button, TextField } from '@mui/material'
import { green } from '@mui/material/colors'
import { StyledModalBody, Textarea } from './styled'
import { TextareaAutosize } from '@mui/base/TextareaAutosize'

type AddThemeModalProps = {
  modalOpen: boolean
  onClose: () => void
  onAddTheme: (newTheme: { title: string; text: string }) => void
}
const AddThemeModal: FC<AddThemeModalProps> = ({
  modalOpen,
  onClose,
  onAddTheme,
}) => {
  const [themeTitle, setThemeTitle] = useState<string>('')
  const [themeText, setThemeText] = useState<string>('')

  const buttonSx = {
    ...(themeTitle &&
      themeText && {
        bgcolor: green[500],
        '&:hover': {
          bgcolor: green[700],
        },
      }),
  }
  const onSubmit = () => {
    if (themeTitle && themeText) {
      const obj = {
        title: themeTitle,
        text: themeText,
      }
      onAddTheme(obj)
      setThemeTitle('')
      setThemeText('')
    }
  }
  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setThemeTitle(event.target.value)
  }
  const onThemeTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setThemeText(event.target.value)
  }
  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      title="Создание новой темы"
      footerButtons={
        <Box sx={{ m: 1, position: 'relative' }}>
          <Button
            variant="contained"
            sx={buttonSx}
            disabled={!themeTitle || !themeText}
            color="primary"
            onClick={onSubmit}>
            Сохранить
          </Button>
        </Box>
      }>
      <StyledModalBody onSubmit={onSubmit}>
        <TextField
          variant="standard"
          fullWidth
          id="theme-title"
          label="Название темы"
          name="theme-title"
          placeholder="Название темы"
          type="text"
          value={themeTitle}
          autoComplete="off"
          onChange={onTitleChange}
        />
        <Textarea
          aria-label="minimum height"
          minRows={3}
          placeholder="Текст темы"
          onChange={onThemeTextChange}
        />
      </StyledModalBody>
    </Modal>
  )
}

export default AddThemeModal
