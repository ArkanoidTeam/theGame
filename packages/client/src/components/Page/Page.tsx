import { Stack, StackProps, useTheme } from '@mui/material'
import { PropsWithChildren } from 'react'

const Page = ({ children, ...stackProps }: PropsWithChildren & StackProps) => {
  const theme = useTheme()

  return (
    <Stack
      justifyContent="space-between"
      useFlexGap
      gap="20px"
      sx={{
        // todo решить вопрос с провайдером темы
        // backgroundColor: theme.palette.layout.pageBackgroundColor
        backgroundColor: '#F3F8FE',
      }}
      minHeight="100vh"
      {...stackProps}>
      {children}
    </Stack>
  )
}

export default Page
