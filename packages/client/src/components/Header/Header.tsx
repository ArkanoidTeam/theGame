import { PropsWithChildren } from 'react'
import { Stack, StackProps, styled } from '@mui/material'

const StyledHeader = styled('header')(() => ({
  width: '100%',
  padding: '20px',
}))

const Header = ({
  children,
  ...stackProps
}: PropsWithChildren & StackProps) => {
  return (
    <StyledHeader>
      <Stack {...stackProps}>{children}</Stack>
    </StyledHeader>
  )
}

export default Header
