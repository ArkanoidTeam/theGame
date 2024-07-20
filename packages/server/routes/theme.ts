import express from 'express'
import {
  createTheme,
  getThemes,
  deleteTheme,
  getUserTheme,
  updateUserTheme,
} from '../controllers/themeControllers'

const router = express.Router()

router.get('/themes', getThemes)
router.post('/themes', createTheme)
router.delete('/themes/:id', deleteTheme)
router.get('/themes/user/:id', getUserTheme)
router.put('/themes/user/:id', updateUserTheme)

export default router
