import { FC, FormEvent, useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { YandexApiAuth } from '../../api/YandexApiAuth'
import {
  ButtonsContainer,
  StyledContainer,
  StyledForm,
  StyledWrapper,
} from './styled'
import { Typography } from '../../components/Typography'
import { login as loginLayer } from '../../store/auth'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/use-app-dispatch'

const Signup: FC = () => {
  const [state, setState] = useState({
    first_name: '',
    second_name: '',
    email: '',
    login: '',
    password: '',
    password_repeat: '',
    phone: '',
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const userData: SignupData = {
      first_name: state.first_name,
      second_name: state.second_name,
      email: state.email,
      login: state.login,
      password: state.password,
      phone: state.phone,
    }

    try {
      await YandexApiAuth.signup(userData)

      dispatch(
        loginLayer({
          isAuth: true,
          user: {
            name: state.login,
            email: state.email,
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
        <Typography component="h3" variant="h3" context="Регистрация" />
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={8}>
              <TextField
                variant="standard"
                fullWidth
                id="first_name"
                label="Имя"
                name="first_name"
                autoComplete="first_name"
                value={state.first_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="standard"
                fullWidth
                id="second_name"
                label="Фамилия"
                name="second_name"
                autoComplete="second_name"
                value={state.second_name}
                onChange={handleChange}
              />
            </Grid>
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
                id="email"
                label="Почта"
                name="email"
                autoComplete="email"
                value={state.email}
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
            <Grid item xs={8}>
              <TextField
                variant="standard"
                fullWidth
                name="password_repeat"
                label="Пароль еще раз"
                type="password"
                id="password_repeat"
                value={state.password_repeat}
                autoComplete="password-repeat"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="standard"
                fullWidth
                name="phone"
                label="Телефон"
                type="tel"
                id="phone"
                value={state.phone}
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
              Зарегистрироваться
            </Button>
            <Grid container>
              <Button fullWidth variant="text" href="/signin">
                Войти
              </Button>
            </Grid>
          </ButtonsContainer>
        </StyledForm>
      </StyledWrapper>
    </StyledContainer>
  )
}

export default Signup
