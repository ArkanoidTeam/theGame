import type { Request, Response } from 'express'
import { Message } from '../models/Message'

export const createMessage = async (req: Request, res: Response) => {
  const { topic_id, parent_id, text, user_login } = req.body

  try {
    const message = await Message.create({
      topic_id,
      parent_id,
      text,
      user_login,
    })
    res.status(201).json(message)
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

export const getMessages = async (_: Request, res: Response) => {
  try {
    const messages = await Message.findAll()
    res.status(200).json(messages)
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

export const getMessagesByTopicId = async (req: Request, res: Response) => {
  const { topic_id } = req.params

  try {
    const messages = await Message.findAll({
      where: { topic_id },
    })

    if (messages.length > 0) {
      res.status(200).json(messages)
    } else {
      res.status(404).json({ error: 'No messages found for this topic' })
    }
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}
