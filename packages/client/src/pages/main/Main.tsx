import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Footer, Header, Page, PageContent } from '../../components'

const Main = () => {
  const navigate = useNavigate()

  return (
    <Page>
      <Header alignItems="flex-end">
        <Button variant="text" onClick={() => navigate('/signin')}>
          Выйти
        </Button>
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
