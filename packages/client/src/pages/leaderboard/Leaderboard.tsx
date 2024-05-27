import { FC } from 'react'
import { Box, Avatar, List, ListItem, ListItemText } from '@mui/material'
import { StyledContainer, StyledCustomStarIcon } from './styled'
import { Typography } from '../../components/Typography'
import players, { Player } from './players'

const Leaderboard: FC = () => {
  return (
    <StyledContainer component="main" maxWidth="sm">
      <Box textAlign={'center'}>
        <Typography component="h1" variant="h2" context="Arkanoid" />
        <Typography component="h3" variant="h3" context="Рейтинг" />
      </Box>
      <Box>
        <List>
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
      </Box>
    </StyledContainer>
  )
}

export default Leaderboard
