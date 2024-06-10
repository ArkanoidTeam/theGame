import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  Footer,
  FullscreenButton,
  Header,
  Page,
  PageContent,
} from '../../components'

const Main = () => {
  const navigate = useNavigate()

  return (
    <Page>
      <Header alignItems="flex-end" justifyContent="space-between">
        <Button variant="text" onClick={() => navigate('/signin')}>
          Выйти
        </Button>
        <FullscreenButton />
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
