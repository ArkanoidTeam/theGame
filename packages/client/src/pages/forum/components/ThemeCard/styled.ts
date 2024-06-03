import styled from '@emotion/styled'
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined'

export const StyledThemeCard = styled('section')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'flex-start',
})

export const ThemeText = styled('p')({
  color: '#535353',
  margin: 0,
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingBottom: '0.5rem',
})

export const ThemeMetaWrapper = styled('div')({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.3rem',
  fontSize: '12px',
})

export const StyledChatBubbleOutlinedIcon = styled(ChatBubbleOutlinedIcon)({
  color: '#bdbdbd',
  fontSize: '16px',
})

export const ThemeMeta = styled('span')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem',
  fontSize: '12px',
  color: 'grey',
})

export const ThemeMetaUser = styled('span')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem',
})
