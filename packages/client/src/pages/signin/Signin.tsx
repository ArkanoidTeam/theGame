import { FC, useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material'
import { Page, PageContent, ValidatedTextField } from '../../components'
import { useNavigate } from 'react-router-dom'
import { YandexApiAuth } from '../../api/YandexApiAuth'
import { login as loginLayer } from '../../store/auth'
import { useAppDispatch } from '../../hooks/use-app-dispatch'
import { ValidationType, validationPatterns } from '../../utils/validation'
import { StyledError, StyledForm } from './styled'
import { YandexApiOAuth } from '../../api/YandexApiOAuth'
import { YANDEX_OAUTH_API_URI, YANDEX_OAUTH_REDIRECT_URI } from '../../utils/constants/api'
import YandexImage from '../../assets/images/yandex.png'

const Signin: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
      const error = err as Record<
        string,
        Record<string, Record<string, string>>
      >
      const message = error.response.data.reason
      setErrorMessage(message)
    }
  }

  const handleOAuthSignIn = useCallback(async () => {
    const { data, status, statusText } = await YandexApiOAuth.getServiceId();

    if (status !== 200) {
      setErrorMessage(statusText);
      return;
    }

    const { service_id } = data;
    const url = `${YANDEX_OAUTH_API_URI}&client_id=${service_id}&redirect_uri=${YANDEX_OAUTH_REDIRECT_URI}`;
    window.location.replace(url);
  }, []);

  return (
    <Page justifyContent="space-around" alignItems="center">
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
          {errorMessage ? <StyledError>{errorMessage}</StyledError> : ''}
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
            <Stack
              flexDirection='row'
              alignItems='center'
              justifyContent='center'
              gap={1}
            >
              <Typography>
                Войти через
              </Typography>
              <IconButton onClick={handleOAuthSignIn}>
                <Box component='img' src={YandexImage} sx={{ height: 30 }} />
              </IconButton>
            </Stack>
          </Stack>
        </PageContent>
      </StyledForm>
    </Page>
  )
}

export default Signin
