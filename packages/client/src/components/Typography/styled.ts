import styled from '@emotion/styled'
import { Typography } from '@mui/material'

type StyledTypographyProps = {
  component: string
  variant: string
}

export const StyledTypography = styled(Typography)<StyledTypographyProps>(
  () => ({})
)
