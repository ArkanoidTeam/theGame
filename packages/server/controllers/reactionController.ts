import type { Request, Response } from 'express'
import { Reaction } from '../models/Reaction'

export const createReaction = async (req: Request, res: Response) => {
  const { message_id, user_login, emoji } = req.body

  try {
    const reaction = await Reaction.create({
      message_id,
      user_login,
      emoji,
    })

    res.status(201).json(reaction)
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

export const getReactionsByMessageId = async (req: Request, res: Response) => {
  const { message_id } = req.params

  try {
    const reactions = await Reaction.findAll({
      where: { message_id },
    })

    if (reactions.length > 0) {
      res.status(200).json(reactions)
    } else {
      res.status(404).json({ error: 'No reactions found for this message' })
    }
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

export const deleteReaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params

  try {
    const reaction = await Reaction.findByPk(id)

    if (!reaction) {
      return res.status(404).json({ error: 'Reaction not found' })
    }

    await reaction.destroy()
    return res.status(204).send()
  } catch (err) {
    const error = err as Error
    return res.status(500).json({ error: error.message })
  }
}
