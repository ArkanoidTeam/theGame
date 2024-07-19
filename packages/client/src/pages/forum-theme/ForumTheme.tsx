import { FC, useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography } from '../../components/Typography'
import { ThemeMessage } from './components'
import { Input, IconButton, CircularProgress } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

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
import { AppApiForum } from '../../api/AppApiForum'
import { CircularProgressWrapper } from '../forum/styled'

const ForumTheme: FC = () => {
  const [theme, setTheme] = useState<ForumThemeVm>()
  const [messages, setMessages] = useState<ForumMessageVm[]>([])
  const [newMessageText, setNewMessageText] = useState('')
  const [loading, setLoading] = useState(false)

  const userData = localStorage.getItem('userData')
  const currentUser = userData ? JSON.parse(userData) : ''

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const {
          data: { messages = [], ...themeData },
        } = await AppApiForum.getTheme(Number(id))
        setTheme(themeData)
        setMessages(messages)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const navigate = useNavigate()

  const onMessageInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessageText(event.target.value)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const onMessageSend = async () => {
    if (!theme) {
      return
    }

    const message = {
      topic_id: theme.id,
      parent_id: null,
      text: newMessageText,
      user_login: currentUser.login,
    }

    const { data: newMessage } = await AppApiForum.createMessage(message)
    setMessages([...messages, newMessage])
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
      {loading ? (
        <CircularProgressWrapper>
          <CircularProgress disableShrink />
        </CircularProgressWrapper>
      ) : (
        <MainContent>
          <StyledContainer component="main" maxWidth="md">
            <Typography component="h6" variant="h6" context={theme?.title} />
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
                onClick={onMessageSend}
                disabled={!newMessageText}>
                <SendIcon />
              </IconButton>
            </InputMessageForm>
          </StyledContainer>
        </MainContent>
      )}
    </PageContainer>
  )
}

export default ForumTheme
