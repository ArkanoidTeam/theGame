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

  let userData = null

  if (typeof window !== 'undefined') {
    userData = localStorage.getItem('userData')
  }

  const currentUser = userData ? JSON.parse(userData) : null

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const result = await AppApiForum.getTheme(Number(id))
        if (result) {
          const data = result.data as ForumThemeVm
          setTheme(data)
          setMessages(data.messages ? data.messages : [])
        }
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
      user_login: currentUser ? currentUser.login : null,
    }

    const result = (await AppApiForum.createMessage(message)) as unknown
    if (result) {
      const newMessageRes = result as Record<string, unknown>
      setMessages([...messages, newMessageRes.data as ForumMessageVm])
      setNewMessageText('')
    }
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
            <Typography component="h4" variant="h4" context={theme?.title} />
            <Typography component="h6" variant="h6" context={theme?.text} />
            <MessagesContainer>
              {messages.length > 0 ? (
                messages.map(item => <ThemeMessage key={item.id} {...item} />)
              ) : (
                <Typography context="Сообщения отсутствуют" />
              )}
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
