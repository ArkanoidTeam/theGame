import express from 'express'
import {
  createTheme,
  getThemes,
  updateTheme,
  deleteTheme,
  getUserTheme,
} from '../controllers/themeControllers'

const router = express.Router()

router.get('/themes', getThemes)
router.put('/themes/:id', updateTheme)
router.post('/themes', createTheme)
router.delete('/themes/:id', deleteTheme)
router.get('/themes/user/:id', getUserTheme)

export default router
