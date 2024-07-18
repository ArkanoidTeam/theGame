import { FC, useState, ChangeEvent } from 'react'
import { Modal } from '../../../../components'
import { Box, Button, TextField } from '@mui/material'
import { green } from '@mui/material/colors'
import { StyledModalBody, Textarea } from './styled'
import { mockUserData } from '../..'

type AddThemeModalProps = {
  modalOpen: boolean
  onClose: () => void
  onAddTheme: (theme: ForumThemeDto) => void
}
const AddThemeModal: FC<AddThemeModalProps> = ({
  modalOpen,
  onClose,
  onAddTheme,
}) => {
  const [title, setTitle] = useState<string>('')
  const [text, setText] = useState<string>('')

  const userData = localStorage.getItem('userData')
  const currentUser = userData ? JSON.parse(userData) : ''

  const buttonSx = {
    ...(title &&
      text && {
        bgcolor: green[500],
        '&:hover': {
          bgcolor: green[700],
        },
      }),
  }
  const onSubmit = () => {
    if (title && text) {
      const theme: ForumThemeDto = {
        title,
        text,
        user_login: currentUser.login,
      }
      onAddTheme(theme)
      setTitle('')
      setText('')
    }
  }
  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const onThemeTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
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
            disabled={!title || !text}
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
          value={title}
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
