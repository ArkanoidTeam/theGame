import { FC, useState, Fragment } from 'react'
import { ThemeCard } from './components'
import { List, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import PageTemplate from '../../components/PageTemplate/PageTemplate'
import { StyledListItem, StyledDivider, AddThemeButtonWrapper } from './styled'
import { AddThemeModal } from './components'

import { mockThemes, mockUserData } from '.'

const Forum: FC = () => {
  const [themes, setThemes] = useState(mockThemes)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(mockUserData)
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
    <PageTemplate pageTitle="Форум">
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
    </PageTemplate>
  )
}

export default Forum
