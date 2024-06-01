import { FC, FormEvent, useState } from 'react'
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
import { useAppDispatch } from '../../hooks/use-app-dispatch'

const Signin: FC = () => {
  const [state, setState] = useState({ login: '', password: '' })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logut = () => {
    return YandexApiAuth.logout()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const userData: SignInData = {
      login: state.login,
      password: state.password,
    }

    try {
      await YandexApiAuth.signin(userData)

      dispatch(
        loginLayer({
          isAuth: true,
          user: {
            name: state.login,
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
                value={state.login}
                onChange={handleChange}
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
                value={state.password}
                onChange={handleChange}
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
