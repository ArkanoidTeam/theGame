import { Button, Grid, Stack, TextField } from '@mui/material'
import { Page, PageContent } from '../../components'

const Signin = () => (
  <Page justifyContent="space-around">
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
  </Page>
)

export default Signin
