import { Stack, useTheme } from '@mui/material'
import { PropsWithChildren } from 'react'

const Page = ({ children }: PropsWithChildren) => {
  const theme = useTheme()

  return (
    <Stack
      justifyContent="space-between"
      useFlexGap
      gap="20px"
      sx={{
        backgroundColor: theme.palette.layout.pageBackgroundColor,
      }}
      minHeight="100vh">
      {children}
    </Stack>
  )
}

export default Page
