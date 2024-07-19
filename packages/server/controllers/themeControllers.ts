import type { Request, Response } from 'express'
import { SiteTheme } from '../models/Theme'

export const getThemes = async (_: Request, res: Response) => {
  try {
    const themes = await SiteTheme.findAll()
    res.status(200).json(themes)
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

export const updateTheme = async (req: Request, res: Response) => {
  const { id } = req.params
  const { theme } = req.body

  try {
    const [updated] = await SiteTheme.update(
      { theme },
      {
        where: { id },
      }
    )

    if (updated) {
      const updatedTheme = await SiteTheme.findOne({ where: { id } })
      res.status(200).json(updatedTheme)
    } else {
      res.status(404).json({ error: 'Theme not found' })
    }
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

export const deleteTheme = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const deleted = await SiteTheme.destroy({
      where: { id },
    })

    if (deleted) {
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Theme not found' })
    }
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

export const createTheme = async (req: Request, res: Response) => {
  const { theme } = req.body

  try {
    const newTheme = await SiteTheme.create({
      theme,
    })
    res.status(201).json(newTheme)
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

export const getUserTheme = async (req: Request, res: Response) => {
  const { user_id } = req.params

  try {
    const userTheme = await SiteTheme.findOne({
      where: { user_id },
    })

    if (userTheme) {
      res.status(200).json(userTheme)
    } else {
      res.status(404).json({ error: 'Theme not found for this user' })
    }
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}
