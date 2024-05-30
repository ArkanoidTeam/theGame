import styled from '@emotion/styled'
import { Container } from '@mui/material'

export const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  justifyContent: 'center',
  minHeight: '100vh',
  minWidth: '100vw',
  overflow: 'hidden',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  padding: '72px',
  borderRadius: '8px',
  alignItems: 'center',
}))

export const StyledBackground = styled.div`
  background: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`
