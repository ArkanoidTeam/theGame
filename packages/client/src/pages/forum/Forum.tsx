import { FC, useState, Fragment, useEffect } from 'react'
import { ThemeCard } from './components'
import { List, Fab, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import {
  StyledListItem,
  StyledDivider,
  AddThemeButtonWrapper,
  CircularProgressWrapper,
} from './styled'
import { AddThemeModal } from './components'
import { Footer, Header, Page, ForumContent } from '../../components'
import { mockThemes, mockUserData } from '.'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import getTopicsRequest from './api/getTopicsRequest'

const Forum: FC = () => {
  const [themes, setThemes] = useState(mockThemes)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(mockUserData)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getTopicsRequest()
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onAddThemeClick = () => {
    setModalOpen(true)
  }
  const onModalClose = () => {
    setModalOpen(false)
  }
  const onAddTheme = (newTheme: { title: string; text: string }) => {
    const theme = {
      id: 112365464,
      title: newTheme.title,
      text: newTheme.text,
      user_avatar: currentUser.avatar as string,
      user_name: currentUser.first_name + ' ' + currentUser.second_name,
      date: new Date().toISOString(),
      answers_count: 0,
    }
    const newThemes = [theme, ...themes]
    setThemes(newThemes)
    setModalOpen(false)
  }
  return (
    <Page>
      <Header alignItems="flex-start">
        <Button
          variant="text"
          onClick={() => navigate('/')}
          startIcon={<ArrowBack />}>
          Вернуться на главную
        </Button>
      </Header>
      {loading ? (
        <CircularProgressWrapper>
          <CircularProgress disableShrink />
        </CircularProgressWrapper>
      ) : (
        <ForumContent pageTitle="Форум">
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {themes.map(item => {
              return (
                <Fragment key={item.id}>
                  <StyledListItem>
                    <ThemeCard {...item} />
                  </StyledListItem>
                  <StyledDivider variant="inset" component="li" />
                </Fragment>
              )
            })}
          </List>
          <AddThemeButtonWrapper>
            <Fab color="primary" aria-label="add" onClick={onAddThemeClick}>
              <AddIcon />
            </Fab>
            <AddThemeModal
              modalOpen={modalOpen}
              onClose={onModalClose}
              onAddTheme={onAddTheme}
            />
          </AddThemeButtonWrapper>
        </ForumContent>
      )}
      <Footer hasLinks />
    </Page>
  )
}

export default Forum
