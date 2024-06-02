import styled from '@emotion/styled'
import { Button, Container, ListItem, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const BackButton = styled(Button)({
  textTransform: 'none',
})

export const StyledArrowBackIcon = styled(ArrowBackIcon)({
  color: '#1976d2',
})

export const StyledListItem = styled(ListItem)({
  width: '100%',
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
