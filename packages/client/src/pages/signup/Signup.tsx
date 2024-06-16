import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { YandexApiAuth } from '../../api/YandexApiAuth'
import { login as loginLayer } from '../../store/auth'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/use-app-dispatch'
import { Button, Grid, Stack, TextField } from '@mui/material'
import { Page, PageContent, ValidatedTextField } from '../../components'
import { ValidationType, validationPatterns } from '../../utils/validation'
import { StyledError, StyledForm } from './styled'

const Signup: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { control, handleSubmit, watch } = useForm<SignupData>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<SignupData> = async userData => {
    try {
      await YandexApiAuth.signup(userData)

      dispatch(
        loginLayer({
          isAuth: true,
          user: {
            name: userData.login,
            email: userData.email,
          },
          accessToken: null,
        })
      )

      navigate('/')
    } catch (err) {
      const error = err as Record<
        string,
        Record<string, Record<string, string>>
      >
      const message = error.response.data.reason
      setErrorMessage(message)
    }
  }

  return (
    <Page justifyContent="space-around" alignItems="center">
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <PageContent title="Arkanoid" subtitle="Регистрация">
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={8}>
              <ValidatedTextField
                label="Имя"
                name="first_name"
                control={control}
                rules={{
                  pattern: validationPatterns[ValidationType.USER],
                }}
                autoComplete="first_name"
              />
            </Grid>
            <Grid item xs={8}>
              <ValidatedTextField
                label="Фамилия"
                name="second_name"
                control={control}
                rules={{
                  pattern: validationPatterns[ValidationType.USER],
                }}
                autoComplete="second_name"
              />
            </Grid>
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
                label="Почта"
                name="email"
                control={control}
                rules={{
                  pattern: validationPatterns[ValidationType.EMAIL],
                }}
                autoComplete="email"
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
                autoComplete="current-password"
                type="password"
              />
            </Grid>
            <Grid item xs={8}>
              <ValidatedTextField
                label="Пароль еще раз"
                name="password_repeat"
                control={control}
                rules={{
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return 'Пароли не совпадают'
                    }
                  },
                }}
                autoComplete="password-repeat"
                type="password"
              />
            </Grid>
            <Grid item xs={8}>
              <ValidatedTextField
                label="Телефон"
                name="phone"
                control={control}
                rules={{
                  pattern: validationPatterns[ValidationType.PHONE],
                }}
                autoComplete="phone"
                type="tel"
              />
            </Grid>
          </Grid>
          {errorMessage ? <StyledError>{errorMessage}</StyledError> : ''}
          <Stack spacing={1}>
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
          </Stack>
        </PageContent>
      </StyledForm>
    </Page>
  )
}

export default Signup
