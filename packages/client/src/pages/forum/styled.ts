import styled from '@emotion/styled'
import { Button, Container, ListItem, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined'

export const BackButton = styled(Button)({
  textTransform: 'none',
})

export const StyledArrowBackIcon = styled(ArrowBackIcon)({
  color: '#1976d2',
})

export const StyledListItem = styled(ListItem)({
  width: '100%',
})

export const ThemeCard = styled('section')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'flex-start',
})

export const ThemeText = styled('p')({
  color: '#939393',
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

type StyledDividerProps = {
  component: string
}

export const StyledDivider = styled(Divider)<StyledDividerProps>(() => ({
  marginLeft: 0,
}))

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
`

type StyledContainerProps = {
  component: string
}

export const StyledContainer = styled(Container)<StyledContainerProps>(() => ({
  display: 'flex',
  justifyContent: 'center',
  minWidth: '464px',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  alignItems: 'center',
  flexGrow: 1,
}))

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100vh;
  height: 100%;
`
export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow-x: hidden;
`
