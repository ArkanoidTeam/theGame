import { Button, Grid, Stack, TextField } from '@mui/material'
import { Page, PageContent } from '../../components'

const Signup = () => {
  return (
    <Page justifyContent="space-around">
      <PageContent title="Arkanoid" subtitle="Регистрация">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={8}>
            <TextField
              variant="standard"
              fullWidth
              id="email"
              label="Почта"
              name="email"
              autoComplete="email"
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
          <Grid item xs={8}>
            <TextField
              variant="standard"
              fullWidth
              name="password-repeat"
              label="Пароль еще раз"
              type="password"
              id="password-repeat"
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
            Зарегистрироваться
          </Button>
          <Grid container>
            <Button fullWidth variant="text" href="/signin">
              Войти
            </Button>
          </Grid>
        </Stack>
      </PageContent>
    </Page>
  )
}

export default Signup
