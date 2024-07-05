import { PropsWithChildren } from 'react'
import { Stack, StackProps, styled, useTheme } from '@mui/material'

type THeaderProps = {
  isFill?: boolean
}

const StyledHeader = styled('header')(({ isFill }: THeaderProps) => {
  const theme = useTheme()

  return {
    padding: '20px',
    backgroundColor:
      //TODO настроить тему для ssr
      // isFill
      //   ? theme.palette.layout.headerAndFooterBackgroundColor
      //   :
      'transparent',
  }
})

const Header = ({
  children,
  isFill = false,
  ...stackProps
}: PropsWithChildren & THeaderProps & StackProps) => {
  return (
    <StyledHeader isFill={isFill}>
      <Stack flexDirection="row" {...stackProps}>
        {children}
      </Stack>
    </StyledHeader>
  )
}

export default Header
