import styled from '@emotion/styled'
import { Avatar } from '@mui/material'

export const StyledAvatar = styled(Avatar)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  &:hover:after {
    cursor: pointer;
    position: absolute;
    content: 'Сменить аватар';
    white-space: pre-line;
    color: #fff;
    padding: 10px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 13px;
    background: #00000080;
    box-sizing: border-box;
  }
`

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export const StyledModalBody = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '1rem',
})
