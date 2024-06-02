import { FC } from 'react'
import { ThemeCard } from './components'
import { List, Divider, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import PageTemplate from '../../components/PageTemplate/PageTemplate'

import { StyledListItem, StyledDivider, AddThemeButtonWrapper } from './styled'

const Forum: FC = () => {
  return (
    <PageTemplate pageTitle="Форум">
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <StyledListItem>
          <ThemeCard />
        </StyledListItem>
        <StyledDivider variant="inset" component="li" />
        <StyledListItem>
          <ThemeCard />
        </StyledListItem>
        <Divider variant="inset" component="li" />
        <StyledListItem>
          <ThemeCard />
        </StyledListItem>
      </List>
      <AddThemeButtonWrapper>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </AddThemeButtonWrapper>
    </PageTemplate>
  )
}

export default Forum
