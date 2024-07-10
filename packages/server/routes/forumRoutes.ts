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

router.post('/topics', createTopic)
router.get('/topics', getTopics)
router.get('/topics/:id', getTopicById)
router.post('/messages', createMessage)
router.get('/messages', getMessages)
router.get('/messages/topic/:topic_id', getMessagesByTopicId)

export default router
