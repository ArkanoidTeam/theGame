import { FC, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '../../components/Typography'
import {
  List,
  ListItem,
  Link,
  Avatar,
  ListItemText,
  Divider,
} from '@mui/material'

import {
  Header,
  BackButton,
  StyledArrowBackIcon,
  StyledContainer,
  StyledWrapper,
  PageContainer,
  MainContent,
  StyledListItem,
  ThemeText,
  StyledDivider,
  ThemeCard,
  ThemeMetaWrapper,
  ThemeMeta,
  StyledChatBubbleOutlinedIcon,
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
                <ThemeCard>
                  <Typography
                    component="h6"
                    variant="h6"
                    context={
                      <Link href="#" underline="none">
                        Как настроить игру чтобы играть с максимальным
                        комфортом?
                      </Link>
                    }
                  />
                  <ThemeText>
                    Пытался смотреть настройки, но постоянно натыкаюсь на
                    какие-то трудности Пытался смотреть настройки, но постоянно
                    натыкаюсь на какие-то трудности
                  </ThemeText>
                  <ThemeMetaWrapper>
                    <ThemeMeta>
                      <StyledChatBubbleOutlinedIcon /> 3
                    </ThemeMeta>
                    <ThemeMeta>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 16, height: 16, fontSize: '0.7rem' }}
                      />
                      <span>Remy Sharp</span>
                      <span>18.05.24 18:05</span>
                    </ThemeMeta>
                  </ThemeMetaWrapper>
                </ThemeCard>
              </StyledListItem>
              <StyledDivider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Когда начинаю игру мячик постоянно куда-то отскакивает и у меня ничего не получается"
                  secondary={
                    'Столкнулся с такой проблемой, когда начинаю игру у меня ничего не получается'
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Пожелания и замечания по улучшению игры"
                  secondary={'Есть пара идей как улучшить игру'}
                />
              </ListItem>
            </List>
          </StyledWrapper>
        </StyledContainer>
      </MainContent>
    </PageContainer>
  )
}

export default Forum
