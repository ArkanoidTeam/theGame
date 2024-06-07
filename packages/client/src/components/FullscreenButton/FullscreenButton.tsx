import { useCallback, useState } from 'react'
import { Button } from '@mui/material'
import {
  CloseFullscreenOutlined,
  OpenInFullOutlined,
} from '@mui/icons-material'

const FullscreenButton = () => {
  const [isFullscreen, setFullscreen] = useState(false)

  const onCatch = (err: { message: string; name: string }) => {
    console.error(`Error: ${err.message} (${err.name})`)
  }

  const onClick = useCallback(() => {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => setFullscreen(false))
        .catch(err => onCatch(err))
    } else {
      document.documentElement
        .requestFullscreen()
        .then(() => setFullscreen(true))
        .catch(err => onCatch(err))
    }
  }, [])

  return (
    <Button variant="text" onClick={onClick}>
      {isFullscreen ? <CloseFullscreenOutlined /> : <OpenInFullOutlined />}
    </Button>
  )
}

export default FullscreenButton
