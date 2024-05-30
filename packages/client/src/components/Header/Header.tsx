import { PropsWithChildren } from 'react'
import { Stack, StackProps, styled, useTheme } from '@mui/material'

type THeaderProps = {
  isFill?: boolean
}

const StyledHeader = styled('header')(({ isFill }: THeaderProps) => {
  const theme = useTheme()

  return {
    width: '100%',
    padding: '20px',
    backgroundColor: isFill
      ? theme.palette.layout.headerAndFooterBackgroundColor
      : 'transparent',
  }
})

const Header = ({
  children,
  isFill = false,
  ...stackProps
}: PropsWithChildren & THeaderProps & StackProps) => {
  return (
    <StyledHeader isFill>
      <Stack flexDirection="row" {...stackProps}>
        {children}
      </Stack>
    </StyledHeader>
  )
}

export default Header
