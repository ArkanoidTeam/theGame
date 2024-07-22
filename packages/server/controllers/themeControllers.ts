import type { Request, Response } from 'express'
import { SiteTheme } from '../models/Theme'
import User from '../models/User'

export const getThemes = async (_: Request, res: Response) => {
  try {
    const themes = await SiteTheme.findAll()
    res.status(200).json(themes)
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
  const { id } = req.params

  try {
    const user = await User.findByPk(id, {})

    if (!user) {
      res.status(404).json({ error: 'Theme not found for this user' })
      return
    }

    const theme = await SiteTheme.findByPk(user.themeId, {})

    if (theme) {
      res.status(200).json(theme)
    } else {
      res.status(404).json({ error: 'Theme not found for this user' })
    }
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}

export const updateUserTheme = async (req: Request, res: Response) => {
  const { id } = req.params
  const { themeId } = req.body

  try {
    let user = await User.findByPk(id)

    if (!user) {
      user = await User.create({
        id,
        username: `user${id}`,
        password: 'defaultPassword',
        themeId,
      })
    }

    const newTheme = await SiteTheme.findByPk(themeId)

    if (!newTheme) {
      res.status(404).json({ error: 'Theme not found' })
      return
    }

    user.themeId = themeId
    await user.save()

    res.status(200).json(user)
  } catch (err) {
    const error = err as Error
    res.status(500).json({ error: error.message })
  }
}
