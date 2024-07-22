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
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { AppApiForum } from '../../api/AppApiForum'

const Forum: FC = () => {
  const [themes, setThemes] = useState<ForumThemeVm[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        let data = []
        const result = await AppApiForum.getThemes()
        if (result) {
          data = result.data
        }
        setThemes(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const onAddThemeClick = () => {
    setModalOpen(true)
  }

  const onModalClose = () => {
    setModalOpen(false)
  }

  const onAddTheme = async (theme: ForumThemeDto) => {
    const result = (await AppApiForum.createTheme(theme)) as unknown
    if (result) {
      const themeRes = result as Record<string, unknown>
      const data = themeRes.data as ForumThemeVm
      setThemes([...themes, data])
      setModalOpen(false)
    }
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
