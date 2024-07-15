import express from 'express'
const router = express.Router()
import {
  createTopic,
  getTopics,
  getTopicById,
} from '../controllers/topicController'
import {
  createMessage,
  getMessages,
  getMessagesByTopicId,
} from '../controllers/messageController'
import auth from '../middleware/auth'

router.post('/topics', auth, createTopic)
router.get('/topics', auth, getTopics)
router.get('/topics/:id', auth, getTopicById)
router.post('/messages', auth, createMessage)
router.get('/messages', auth, getMessages)
router.get('/messages/topic/:topic_id', auth, getMessagesByTopicId)

export default router
