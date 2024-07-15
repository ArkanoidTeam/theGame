import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  Footer,
  FullscreenButton,
  ThemeToggle,
  Header,
  Page,
  PageContent,
} from '../../components'
import { YandexApiAuth } from '../../api/YandexApiAuth'

const Main = () => {
  const navigate = useNavigate()

  const onExitClick = () => {
    YandexApiAuth.logout()
      .then(() => navigate('/signin'))
      .catch(err => console.log(err))
  }

  return (
    <Page>
      <Header alignItems="flex-end" justifyContent="space-between">
        <Button variant="text" onClick={onExitClick}>
          Выйти
        </Button>
        <div>
          <ThemeToggle />
          <FullscreenButton />
        </div>
      </Header>
      <PageContent title="Arkanoid" subtitle="2d-аркада">
        <Button type="submit" onClick={() => navigate('/arkanoid')}>
          Начать игру
        </Button>
      </PageContent>
      <Footer hasLinks />
    </Page>
  )
}

export default Main
