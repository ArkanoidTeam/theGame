import styled from '@emotion/styled'
import { Container } from '@mui/material'
import CustomStarIcon from './CustomStarIcon'

type StyledContainerProps = {
  maxWidth: string
  component: string
}

export const StyledContainer = styled(Container)<StyledContainerProps>(() => ({
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  padding: '72px',
  borderRadius: '5px',
  alignItems: 'center',
  marginTop: '116px',
}))

export const StyledCustomStarIcon = styled(CustomStarIcon)({
  position: 'absolute',
  width: '6rem',
  height: '6rem',
  top: '-2rem',
})
