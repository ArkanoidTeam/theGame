import styled from '@emotion/styled'
import { ListItem, Divider } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

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
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%',
  boxSizing: 'border-box',
})
export const CircularProgressWrapper = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
