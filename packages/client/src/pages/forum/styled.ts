import styled from '@emotion/styled'
import { ListItem, Divider } from '@mui/material'

export const StyledListItem = styled(ListItem)({
  width: '100%',
})

type StyledDividerProps = {
  component: string
}

export const StyledDivider = styled(Divider)<StyledDividerProps>(() => ({
  marginLeft: 0,
}))
export const AddThemeButtonWrapper = styled('div')({
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%',
  boxSizing: 'border-box',
})
