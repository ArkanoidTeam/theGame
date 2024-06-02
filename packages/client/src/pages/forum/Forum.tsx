import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '../../components/Typography'
import { ThemeCard } from './components'
import { List, Divider } from '@mui/material'

import {
  Header,
  BackButton,
  StyledArrowBackIcon,
  StyledContainer,
  StyledWrapper,
  PageContainer,
  MainContent,
  StyledListItem,
  StyledDivider,
} from './styled'

const Forum: FC = () => {
  const navigate = useNavigate()
  return (
    <PageContainer>
      <Header>
        <BackButton
          variant="text"
          startIcon={<StyledArrowBackIcon />}
          onClick={() => navigate('/signin')}>
          Вернуться на главную
        </BackButton>
      </Header>
      <MainContent>
        <StyledContainer component="main" maxWidth="md">
          <StyledWrapper>
            <Typography component="h2" variant="h2" context="Arkanoid" />
            <Typography component="h4" variant="h4" context="Форум" />
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
          </StyledWrapper>
        </StyledContainer>
      </MainContent>
    </PageContainer>
  )
}

export default Forum
