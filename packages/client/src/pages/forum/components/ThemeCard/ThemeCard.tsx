import { FC, useEffect, useMemo, useState } from 'react'
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
import { YandexApiUsers } from '../../../../api/YandexApiUsers'

const ThemeCard: FC<ForumThemeVm> = (props: ForumThemeVm) => {
  const { title, text, user_login, createdAt, messages_count, id } = props
  const [userAvatar, setUserAvatar] = useState<string>()

  const dateString = useMemo(
    () => getDateTimeString(createdAt, 'fullNoSecs'),
    [createdAt]
  )

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const { data: users } = await YandexApiUsers.search(user_login)
        const user = users.find(user => user.login === user_login)

        if (user && user.avatar) {
          setUserAvatar(user.avatar)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchAvatar()
  }, [user_login])

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
          <span>{messages_count}</span>
        </ThemeMeta>
        <ThemeMeta>
          <ThemeMetaUser>
            <Avatar
              alt={user_login}
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
