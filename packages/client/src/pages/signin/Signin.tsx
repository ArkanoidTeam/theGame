import { FC, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Grid, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  ButtonsContainer,
  StyledContainer,
  StyledForm,
  StyledWrapper,
} from './styled'
import { Typography } from '../../components/Typography'
import { YandexApiAuth } from '../../api/YandexApiAuth'
import { login as loginLayer } from '../../store/auth'

const Signin: FC = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logut = () => {
    return YandexApiAuth.logout()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const userData: SignInData = {
      login,
      password,
    }

    try {
      await YandexApiAuth.signin(userData)

      dispatch(
        loginLayer({
          isAuth: true,
          user: {
            name: login,
          },
          accessToken: null,
        })
      )

      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledWrapper>
        <Typography component="h1" variant="h2" context="Arkanoid" />
        <Typography component="h3" variant="h3" context="Вход" />
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={8}>
              <TextField
                variant="standard"
                fullWidth
                id="login"
                label="Логин"
                name="login"
                autoComplete="login"
                value={login}
                onChange={e => setLogin(e.target.value)}
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
                value={password}
                onChange={e => setPassword(e.target.value)}
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
              <Button onClick={logut} fullWidth variant="text">
                logut
              </Button>
            </Grid>
          </ButtonsContainer>
        </StyledForm>
      </StyledWrapper>
    </StyledContainer>
  )
}

export default Signin
