import { FC, useMemo } from 'react'
import { Typography } from '../../../../components/Typography'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'
import getDateTimeString from '../../../../utils/getDateTimeString'

import {
  ThemeText,
  StyledThemeCard,
  ThemeMetaWrapper,
  ThemeMeta,
  ThemeMetaUser,
  StyledChatBubbleOutlinedIcon,
} from './styled'

type ThemeCardProps = {
  title: string
  text: string
  user_avatar: string
  user_name: string
  date: string
  answers_count: number
  id: number
}
const ThemeCard: FC<ThemeCardProps> = (props: ThemeCardProps) => {
  const { title, text, user_avatar, user_name, date, answers_count, id } = props
  const dateString = useMemo(
    () => getDateTimeString(date, 'fullNoSecs'),
    [date]
  )
  const linkStyle = {
    color: '#1976d2',
    textDecoration: 'none',
  }
  return (
    <StyledThemeCard>
      <Typography
        component="h6"
        variant="h6"
        context={
          <Link to={String(id)} style={linkStyle}>
            {title}
          </Link>
        }
      />
      <ThemeText>{text}</ThemeText>
      <ThemeMetaWrapper>
        <ThemeMeta>
          <StyledChatBubbleOutlinedIcon />
          <span>{answers_count}</span>
        </ThemeMeta>
        <ThemeMeta>
          <ThemeMetaUser>
            <Avatar
              alt="Remy Sharp"
              src={user_avatar}
              sx={{ width: 16, height: 16, fontSize: '0.7rem' }}
            />
            <span>{user_name}</span>
          </ThemeMetaUser>
          <span>{dateString}</span>
        </ThemeMeta>
      </ThemeMetaWrapper>
    </StyledThemeCard>
  )
}
export default ThemeCard
