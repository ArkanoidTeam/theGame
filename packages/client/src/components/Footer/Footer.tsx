import { useNavigate } from 'react-router-dom'
import {
  Button,
  ButtonGroup,
  Stack,
  StackProps,
  styled,
  useTheme,
} from '@mui/material'
import { PropsWithChildren } from 'react'

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

type TFooterProps = {
  isFill?: boolean
  hasLinks?: boolean
}

const StyledFooter = styled('footer')(({ isFill }: TFooterProps) => {
  const theme = useTheme()

  return {
    width: '100%',
    padding: '20px',
    backgroundColor: isFill
      ? theme.palette.layout.headerAndFooterBackgroundColor
      : 'transparent',
  }
})

const Footer = ({
  children,
  isFill = false,
  hasLinks = false,
  ...stackProps
}: PropsWithChildren & TFooterProps & StackProps) => {
  const navigate = useNavigate()

  return (
    <StyledFooter isFill>
      {hasLinks ? (
        <ButtonGroup variant="text" fullWidth>
          {pages.map(({ key, path, label }) => {
            return (
              <Button key={key} onClick={() => navigate(path)}>
                {label}
              </Button>
            )
          })}
        </ButtonGroup>
      ) : (
        <Stack flexDirection="row" {...stackProps}>
          {children}
        </Stack>
      )}
    </StyledFooter>
  )
}

export default Footer
