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
  /* TODO подобрать картинку для 404 */
  background: url(https://cdn.dribbble.com/userupload/8726278/file/original-ab1bde6f9c74de5c8961f7fe84990cd4.gif);
  height: 400px;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`
