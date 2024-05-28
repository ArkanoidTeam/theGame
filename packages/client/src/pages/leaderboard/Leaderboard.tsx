import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material'
import { StyledCustomStarIcon } from './styled'
import players, { Player } from './players'
import { Header, Page, PageContent } from '../../components'
import { useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'

const Leaderboard = () => {
  const navigate = useNavigate()

  return (
    <Page>
      <Header alignItems="flex-start">
        <Button
          variant="text"
          onClick={() => navigate('/')}
          startIcon={<ArrowBack />}
        >
          Вернуться
        </Button>
      </Header>
      <PageContent title="Arkanoid" subtitle="Рейтинг">
        <List sx={{ width: '100%' }}>
          {players.map((player: Player, index: number) => (
            <ListItem key={player.name}>
              <ListItemText>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  sx={{ ml: 5 }}>
                  <Box display="flex" alignItems={'center'}>
                    {index + 1}
                    <Avatar
                      sx={{ ml: 2.5 }}
                      src={player.imgSrc}
                      alt={player.name}
                    />
                    <Box sx={{ ml: 2.5 }} position={'relative'}>
                      {player.name}
                      {player.isYou && <StyledCustomStarIcon />}
                    </Box>
                  </Box>
                  {player.score}
                </Box>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </PageContent>
    </Page>
  )
}

export default Leaderboard
