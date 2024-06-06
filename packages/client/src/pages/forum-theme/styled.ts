import styled from '@emotion/styled'
import { Button, Container, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const MessagesContainer = styled('div')({
  flexGrow: 1,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

type StyledDividerProps = {
  component: string
}

export const StyledDivider = styled(Divider)<StyledDividerProps>(() => ({
  marginLeft: 0,
}))

export const BackButton = styled(Button)({
  textTransform: 'none',
})

export const StyledArrowBackIcon = styled(ArrowBackIcon)({
  color: '#1976d2',
})

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

export const StyledContainer = styled(Container)<StyledContainerProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
  min-width: '464px';
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 24px;
`

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
export const InputMessageForm = styled('form')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
})
