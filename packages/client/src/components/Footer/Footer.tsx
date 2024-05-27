import { useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, styled } from '@mui/material'

type TPage = {
  key: string
  path: string
  label: string
}

const pages: TPage[] = [
  { key: 'profile', label: 'Аккаунт', path: '/profile' },
  { key: 'forum', label: 'Форум', path: '/forum' },
  { key: 'help', label: 'Справка', path: '/help' },
  { key: 'leaderboard', label: 'Рейтинг', path: '/leaderboard' },
]

const StyledFooter = styled('footer')(() => ({
  width: '100%',
  padding: '20px',
}))

const Footer = () => {
  const navigate = useNavigate()

  return (
    <StyledFooter>
      <ButtonGroup variant="text" fullWidth>
        {pages.map(({ key, path, label }) => {
          return (
            <Button key={key} onClick={() => navigate(path)}>
              {label}
            </Button>
          )
        })}
      </ButtonGroup>
    </StyledFooter>
  )
}

export default Footer
