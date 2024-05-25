import { StyledTypography } from './styled'

export const Typography = ({
  context,
  component,
  variant,
}: Record<string, any>) => {
  return (
    <StyledTypography component={component} variant={variant}>
      {context}
    </StyledTypography>
  )
}
