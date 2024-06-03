import { FC, useMemo } from 'react'
import { MessageContainer, ThemeMeta, ThemeMetaUser } from './styled'
import { Avatar } from '@mui/material'
import getDateTimeString from '../../../../utils/getDateTimeString'

type ThemeMessageProps = {
  message_text: string
  user_avatar: string
  user_name: string
  date: string
  is_author: boolean
}
const ThemeMessage: FC<ThemeMessageProps> = ({
  message_text,
  user_avatar,
  user_name,
  date,
  is_author,
}) => {
  const dateString = useMemo(
    () => getDateTimeString(date, 'fullNoSecs'),
    [date]
  )
  return (
    <MessageContainer
      alignSelf={is_author ? 'flex-start' : 'flex-end'}
      backgroundColor={is_author ? '#F8F8F8' : '#E9F3FF'}
      borderRadius={is_author ? '0 12px 12px' : '12px 12px 0'}>
      <span>{message_text}</span>
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
    </MessageContainer>
  )
}

export default ThemeMessage
