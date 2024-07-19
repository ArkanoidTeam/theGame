import { FC, useMemo, useState } from 'react'
import {
  MessageContainer,
  ThemeEmoji,
  ThemeMeta,
  ThemeMetaUser,
} from './styled'
import { Avatar, Popover } from '@mui/material'
import getDateTimeString from '../../../../utils/getDateTimeString'
import EmojiPicker from 'emoji-picker-react'

const ThemeMessage: FC<ForumMessageVm> = ({ text, user_login, createdAt }) => {
  const userData = localStorage.getItem('userData')
  const currentUser = userData ? JSON.parse(userData) : ''

  const dateString = useMemo(
    () => getDateTimeString(createdAt, 'fullNoSecs'),
    [createdAt]
  )
  const isAuthor = useMemo(() => currentUser.login === user_login, [user_login])
  const userAvatar = useMemo(() => '', [])
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLButtonElement)
  }

  //TODO подключить получение и отправку emoji с/на бэк после завершения задачи на хранение emoji
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const [isEmoji, setEmoji] = useState<string>('')
  const handleEmojiClicked = (emojiObject: { emoji: string }) => {
    setEmoji(prev => prev + emojiObject.emoji)
    setAnchorEl(null)
  }
  return (
    <MessageContainer
      alignSelf={isAuthor ? 'flex-end' : 'flex-start'}
      backgroundColor={isAuthor ? '#E9F3FF' : '#F8F8F8'}
      borderRadius={isAuthor ? '12px 12px 0' : '0 12px 12px'}
      onContextMenu={event => {
        event.preventDefault()
        handleContextMenu(event)
      }}
      onMouseLeave={() => setAnchorEl(null)}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <EmojiPicker
          onEmojiClick={handleEmojiClicked}
          autoFocusSearch={false}
          lazyLoadEmojis={true}
          skinTonesDisabled={true}
          searchDisabled={true}
        />
      </Popover>
      <span>{text}</span>
      <ThemeMeta>
        <ThemeMetaUser>
          <Avatar
            alt={user_login}
            src={userAvatar}
            sx={{ width: 16, height: 16, fontSize: '0.7rem' }}
          />
          <span>{user_login}</span>
        </ThemeMetaUser>

        <ThemeEmoji>
          <p>{isEmoji}</p>
        </ThemeEmoji>
        <span>{dateString}</span>
      </ThemeMeta>
    </MessageContainer>
  )
}

export default ThemeMessage
