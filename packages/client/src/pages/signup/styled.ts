import styled from '@emotion/styled'
import {
  Button,
  Typography,
  Container,
  Grid,
  TextField,
  Link,
} from '@mui/material'

type StyledContainerProps = {
  maxWidth: string
  component: string
}

export const StyledContainer = styled(Container)<StyledContainerProps>(() => ({
  display: 'flex',
  justifyContent: 'center',
  minHeight: '700px',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  padding: '72px',
  borderRadius: '8px',
  alignItems: 'center',
}))

export const StyledForm = styled.form`
  margin: 20px auto;
`

export const ButtonsContainer = styled.div`
  width: 50%;
  margin: 40px auto;
`

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
