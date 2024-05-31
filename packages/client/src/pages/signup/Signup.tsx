import { FC, FormEvent, useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
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

const Signup: FC = () => {
  const [first_name, setFirstName] = useState('')
  const [second_name, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [password_repeat, setPasswordRepeat] = useState('')
  const [phone, setPhone] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const userData: SignupData = {
      first_name,
      second_name,
      email,
      login,
      password,
      phone,
    }

    try {
      await YandexApiAuth.signup(userData)

      dispatch(
        loginLayer({
          isAuth: true,
          user: {
            name: login,
            email,
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
                value={first_name}
                onChange={e => setFirstName(e.target.value)}
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
                value={second_name}
                onChange={e => setSecondName(e.target.value)}
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
                value={login}
                onChange={e => setLogin(e.target.value)}
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
                value={email}
                onChange={e => setEmail(e.target.value)}
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
            <Grid item xs={8}>
              <TextField
                variant="standard"
                fullWidth
                name="password-repeat"
                label="Пароль еще раз"
                type="password"
                id="password-repeat"
                value={password_repeat}
                onChange={e => setPasswordRepeat(e.target.value)}
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
                value={phone}
                onChange={e => setPhone(e.target.value)}
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
