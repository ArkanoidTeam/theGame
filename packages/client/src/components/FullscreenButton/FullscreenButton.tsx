import { useState } from 'react'
import { Button } from '@mui/material'
import {
  CloseFullscreenOutlined,
  OpenInFullOutlined,
} from '@mui/icons-material'

const FullscreenButton = () => {
  const [isFullscreen, setFullscreen] = useState(false)

  const onClick = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setFullscreen(true))
        .catch(err => {
          console.error(`Error: ${err.message} (${err.name})`)
        })
    } else {
      document
        .exitFullscreen()
        .then(() => setFullscreen(false))
        .catch(err => {
          console.error(`Error: ${err.message} (${err.name})`)
        })
    }
  }
  return (
    <Button variant="text" onClick={onClick}>
      {isFullscreen ? <CloseFullscreenOutlined /> : <OpenInFullOutlined />}
    </Button>
  )
}

export default FullscreenButton
