import { PropsWithChildren } from 'react'
import { Stack, StackProps, Typography, useTheme } from '@mui/material'

type TPageProps = {
  title?: string
  subtitle?: string
}

const PageContent = ({
  title,
  subtitle,
  children,
  ...stackProps
}: PropsWithChildren & StackProps & TPageProps) => {
  const theme = useTheme()

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.layout.pageContentBackgroundColor,
        borderRadius: '5px',
        border: '1px solid #ddd',
        maxWidth: '650px',
        padding: '70px 60px',
      }}
      alignSelf="center"
      alignItems="center"
      gap="50px"
      width="100%"
      {...stackProps}>
      {(title || subtitle) && (
        <Stack alignItems="center" gap="10px">
          {title && (
            <Typography component="h2" variant="h2">
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography component="h4" variant="h4">
              {subtitle}
            </Typography>
          )}
        </Stack>
      )}
      {children}
    </Stack>
  )
}

export default PageContent
