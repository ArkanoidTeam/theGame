import styled from '@emotion/styled'
import { Container } from '@mui/material'

type StyledContainerProps = {
  maxWidth: string
  component: string
}

export const StyledContainer = styled(Container)<StyledContainerProps>(() => ({
  display: 'flex',
  justifyContent: 'center',
  height: '654px',
  minWidth: '464px',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  padding: '72px 98px',
  borderRadius: '8px',
  alignItems: 'center',
}))

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100vh;
  height: 100%;
  overflow: hidden;
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

export const FooterButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  background-color: #e9f3ff;
`

export const Footer = styled.footer`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #e9f3ff;
`

export const VerticalDivider = styled.div`
  border-left: 1px solid blue;
  height: 100%;
  margin: 0 10px;
`
export const GameContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
})

export const CanvasWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  width: '80%',
  height: '100%',
  backgroundColor: 'white',
  border: '1px solid lightgrey',
})
