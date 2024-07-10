import type { Request, Response } from 'express'
import { Topic } from '../models/Topic'
import { Message } from '../models/Message'

export const createTopic = async (req: Request, res: Response) => {
  const { title, text, user_login } = req.body

  try {
    const topic = await Topic.create({ title, text, user_login })
    res.status(201).json(topic)
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

export const getTopics = async (_: Request, res: Response) => {
  try {
    const topics = await Topic.findAll()
    res.status(200).json(topics)
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

export const getTopicById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const topic = await Topic.findByPk(id, {
      include: [Message],
    })

    if (topic) {
      res.status(200).json(topic)
    } else {
      res.status(404).json({ error: 'Topic not found' })
    }
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}
