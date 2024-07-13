import { Stack, StackProps, useTheme } from '@mui/material'
import { PropsWithChildren, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const Page = ({ children, ...stackProps }: PropsWithChildren & StackProps) => {
  const theme = useTheme()
  const mode = useSelector((state: RootState) => state.theme.theme)

  useEffect(() => {
    console.log(mode)
  }, [mode])

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
