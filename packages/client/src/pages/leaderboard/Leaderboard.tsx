import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material'
import { StyledCustomStarIcon } from './styled'
import { Footer, Header, Page, PageContent } from '../../components'
import { useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { YandexApiLeaderboard } from '../../api/YandexApiLeaderboard'

const RESOURCES_LINK = `https://ya-praktikum.tech/api/v2/resources`

const Leaderboard = () => {
  const navigate = useNavigate()
  const userData = localStorage.getItem('userData')
  const userName = userData ? JSON.parse(userData).login : ''

  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = {
          ratingFieldName: 'scoreArkanoidTeam',
          cursor: 0,
          limit: 10,
        }

        const responseData = await YandexApiLeaderboard.leaderboardAll(data)
        const playersData = responseData.data.map(
          (item: { data: Player }) => item.data
        )
        setPlayers(playersData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPlayers()
  }, [])

  return (
    <Page>
      <Header alignItems="flex-start">
        <Button
          variant="text"
          onClick={() => navigate('/')}
          startIcon={<ArrowBack />}>
          Вернуться
        </Button>
      </Header>
      <PageContent title="Arkanoid" subtitle="Рейтинг">
        <List sx={{ width: '100%' }}>
          {players.map((player: Player, index: number) => (
            <ListItem key={player.userName}>
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
                      src={RESOURCES_LINK + player.userAvatar}
                      alt={player.userName}
                    />
                    <Box sx={{ ml: 2.5 }} position={'relative'}>
                      {player.userName}
                      {player.userName === userName && <StyledCustomStarIcon />}
                    </Box>
                  </Box>
                  {player.scoreArkanoidTeam}
                </Box>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </PageContent>
      <Footer hasLinks />
    </Page>
  )
}

export default Leaderboard
