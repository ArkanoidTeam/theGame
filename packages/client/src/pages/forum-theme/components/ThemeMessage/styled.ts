import styled from '@emotion/styled'

type TMessageContainer = {
  backgroundColor: string
  alignSelf: string
  borderRadius: string
}

export const MessageContainer = styled('section')<TMessageContainer>(
  ({ alignSelf, backgroundColor, borderRadius }) => ({
    padding: '11px',
    backgroundColor,
    maxWidth: '600px',
    minWidth: '400px',
    boxSizing: 'border-box',
    borderRadius,
    alignSelf,
    lineHeight: '1.25',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  })
)

export const ThemeMeta = styled('span')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem',
  fontSize: '12px',
  color: 'grey',
  justifyContent: 'flex-end',
})

export const ThemeMetaUser = styled('span')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem',
})
