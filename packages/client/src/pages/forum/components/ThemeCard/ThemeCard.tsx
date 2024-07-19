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
import { RESOURCES_LINK } from '../../../../utils/constants/api'

const ThemeCard: FC<ForumThemeVm> = (props: ForumThemeVm) => {
  const { title, text, user_login, createdAt, answers_count, id } = props
  const dateString = useMemo(
    () => getDateTimeString(createdAt, 'fullNoSecs'),
    [createdAt]
  )
  const userAvatar = useMemo(() => '', [])
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
              src={userAvatar ? RESOURCES_LINK + userAvatar : ''}
              sx={{ width: 16, height: 16, fontSize: '0.7rem' }}
            />
            <span>{user_login}</span>
          </ThemeMetaUser>
          <span>{dateString}</span>
        </ThemeMeta>
      </ThemeMetaWrapper>
    </StyledThemeCard>
  )
}
export default ThemeCard
