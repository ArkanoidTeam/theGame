import { FC } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import {
  ButtonsContainer,
  StyledContainer,
  StyledForm,
  StyledWrapper,
} from './styled'
import { Typography } from '../../components/Typography'
const Signin: FC = () => {
  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledWrapper>
        <Typography component="h1" variant="h2" context="Arkanoid" />
        <Typography component="h3" variant="h3" context="Вход" />
        <StyledForm>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={8}>
              <TextField
                variant="standard"
                fullWidth
                id="login"
                label="Логин"
                name="login"
                autoComplete="login"
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="standard"
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <ButtonsContainer>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit">
              Войти
            </Button>
            <Grid container>
              <Button fullWidth variant="text" href="/signup">
                Зарегистрироваться
              </Button>
            </Grid>
          </ButtonsContainer>
        </StyledForm>
      </StyledWrapper>
    </StyledContainer>
  )
}

export default Signin
