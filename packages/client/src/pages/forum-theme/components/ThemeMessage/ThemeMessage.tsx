import { FC, useMemo, useState } from 'react'
import {
  MessageContainer,
  ThemeEmoji,
  ThemeMeta,
  ThemeMetaUser,
} from './styled'
import { Avatar, Popover } from '@mui/material'
import getDateTimeString from '../../../../utils/getDateTimeString'
// import EmojiPicker from 'emoji-picker-react'
type ThemeMessageProps = {
  message_text: string
  user_avatar: string
  user_name: string
  date: string
  is_author: boolean
  emoji: string
}
const ThemeMessage: FC<ThemeMessageProps> = ({
  message_text,
  user_avatar,
  user_name,
  date,
  is_author,
  emoji,
}) => {
  const dateString = useMemo(
    () => getDateTimeString(date, 'fullNoSecs'),
    [date]
  )
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLButtonElement)
  }

  //TODO подключить получение и отправку emoji с/на бэк
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const [isEmoji, setEmoji] = useState<string>(emoji)
  const handleEmojiClicked = (emojiObject: { emoji: string }) => {
    setEmoji(prev => prev + emojiObject.emoji)
    setAnchorEl(null)
  }
  return (
    <MessageContainer
      alignSelf={is_author ? 'flex-start' : 'flex-end'}
      backgroundColor={is_author ? '#F8F8F8' : '#E9F3FF'}
      borderRadius={is_author ? '0 12px 12px' : '12px 12px 0'}
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
        {/* <EmojiPicker
          onEmojiClick={handleEmojiClicked}
          autoFocusSearch={false}
          lazyLoadEmojis={true}
          skinTonesDisabled={true}
          searchDisabled={true}
        /> */}
      </Popover>
      <span>{message_text}</span>
      <ThemeMeta>
        <ThemeMetaUser>
          <Avatar
            alt={user_name}
            src={user_avatar}
            sx={{ width: 16, height: 16, fontSize: '0.7rem' }}
          />
          <span>{user_name}</span>
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
