import { FC, useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '../../components/Typography'
import { ThemeMessage } from './components'
import { Input, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

import { mockMessages } from '.'

import {
  Header,
  BackButton,
  StyledArrowBackIcon,
  StyledContainer,
  PageContainer,
  MainContent,
  MessagesContainer,
  StyledDivider,
  InputMessageForm,
} from './styled'

const ForumTheme: FC = () => {
  const [messages, setMessages] = useState(mockMessages)
  const [newMessageText, setNewMessageText] = useState('')

  const navigate = useNavigate()

  const onMessageInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessageText(event.target.value)
  }
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const onMessaSend = () => {
    const newMessage = {
      id: Math.floor(Math.random() * 10000),
      message_text: newMessageText,
      user_avatar: '',
      user_name: 'Петр Петров',
      date: new Date().toISOString(),
      is_author: false,
      emoji: '',
    }
    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
    setNewMessageText('')
  }
  return (
    <PageContainer>
      <Header>
        <BackButton
          variant="text"
          startIcon={<StyledArrowBackIcon />}
          onClick={() => navigate('/forum')}>
          Вернуться к списку тем
        </BackButton>
      </Header>
      <MainContent>
        <StyledContainer component="main" maxWidth="md">
          <Typography component="h6" variant="h6" context="Название темы" />
          <MessagesContainer>
            {messages.map(item => (
              <ThemeMessage key={item.id} {...item} />
            ))}
          </MessagesContainer>
          <StyledDivider variant="inset" component="span" />
          <InputMessageForm onSubmit={onSubmit}>
            <Input
              fullWidth
              aria-label="message-input"
              multiline
              placeholder="Введите сообщение"
              value={newMessageText}
              onChange={onMessageInput}
            />
            <IconButton
              color="primary"
              aria-label="send-message"
              type="submit"
              onClick={onMessaSend}
              disabled={!newMessageText}>
              <SendIcon />
            </IconButton>
          </InputMessageForm>
        </StyledContainer>
      </MainContent>
    </PageContainer>
  )
}

export default ForumTheme
