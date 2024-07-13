import { Stack, StackProps, useTheme } from '@mui/material'
import { PropsWithChildren } from 'react'

const Page = ({ children, ...stackProps }: PropsWithChildren & StackProps) => {
  const theme = useTheme()

  return (
    <Stack
      justifyContent="space-between"
      useFlexGap
      sx={{
        backgroundColor: theme.palette.layout.pageBackgroundColor,
      }}
      minHeight="100vh"
      {...stackProps}>
      {children}
    </Stack>
  )
}

export default Page
