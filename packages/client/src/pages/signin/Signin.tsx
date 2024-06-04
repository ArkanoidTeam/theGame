import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Grid, Stack } from '@mui/material'
import { Page, PageContent, ValidatedTextField } from '../../components'
import { useNavigate } from 'react-router-dom'
import { YandexApiAuth } from '../../api/YandexApiAuth'
import { login as loginLayer } from '../../store/auth'
import { useAppDispatch } from '../../hooks/use-app-dispatch'
import { ValidationType, validationPatterns } from '../../utils/validation'

const Signin: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm<SignInData>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<SignInData> = async userData => {
    try {
      await YandexApiAuth.signin(userData)

      dispatch(
        loginLayer({
          isAuth: true,
          user: {
            name: userData.login,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageContent title="Arkanoid" subtitle="Вход">
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={8}>
              <ValidatedTextField
                label="Логин"
                name="login"
                control={control}
                rules={{
                  pattern: validationPatterns[ValidationType.LOGIN],
                }}
                autoComplete="login"
              />
            </Grid>
            <Grid item xs={8}>
              <ValidatedTextField
                label="Пароль"
                name="password"
                control={control}
                rules={{
                  pattern: validationPatterns[ValidationType.PASSOWRD],
                }}
                type="password"
                autoComplete="current-password"
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
