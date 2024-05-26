import React, { FC } from 'react'
import { Button } from '@mui/material'
import {
  Header,
  Footer,
  ButtonsContainer,
  FooterButtonsContainer,
  StyledContainer,
  StyledWrapper,
  PageContainer,
  MainContent,
  VerticalDivider,
} from './styled'
import { Typography } from '../../components/Typography'
import { useNavigate } from 'react-router-dom'

const pages = [
  { key: 'profile', label: 'Аккаунт', path: '/profile' },
  { key: 'forum', label: 'Форум', path: '/forum' },
  { key: 'help', label: 'Справка', path: '/help' },
  { key: 'leaderboard', label: 'Рейтинг', path: '/leaderboard' },
]

const Main: FC = () => {
  const navigate = useNavigate()

  return (
    <PageContainer>
      <Header>
        <Button
          variant="text"
          className="logout"
          onClick={() => navigate('/signin')}>
          Выйти
        </Button>
      </Header>
      <MainContent>
        <StyledContainer component="main" maxWidth="md">
          <StyledWrapper>
            <Typography component="h2" variant="h2" context="Arkanoid" />
            <Typography component="h4" variant="h4" context="2d-аркада" />
            <ButtonsContainer>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="start"
                onClick={() => navigate('/arkanoid')}>
                Начать игру
              </Button>
            </ButtonsContainer>
          </StyledWrapper>
        </StyledContainer>
      </MainContent>
      <Footer>
        <FooterButtonsContainer>
          {pages.map((page, index) => (
            <React.Fragment key={page.key}>
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate(page.path)}>
                {page.label}
              </Button>
              {index < pages.length - 1 && <VerticalDivider />}
            </React.Fragment>
          ))}
        </FooterButtonsContainer>
      </Footer>
    </PageContainer>
  )
}

export default Main
