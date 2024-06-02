import { FC, FormEvent, useState } from 'react'
import { Button, Grid, Stack, TextField, FormControl } from '@mui/material'
import { Page, PageContent } from '../../components'
import { useNavigate } from 'react-router-dom'
import { YandexApiAuth } from '../../api/YandexApiAuth'
import { login as loginLayer } from '../../store/auth'
import { useAppDispatch } from '../../hooks/use-app-dispatch'

const Signin: FC = () => {
  const [state, setState] = useState({ login: '', password: '' })
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
    <Page justifyContent="space-around" alignItems="center">
      <form onSubmit={handleSubmit}>
        <PageContent title="Arkanoid" subtitle="Вход">
          <Grid container spacing={1} justifyContent="center">
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
          <Stack spacing={1}>
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
          </Stack>
        </PageContent>
      </form>
    </Page>
  )
}

export default Signin
