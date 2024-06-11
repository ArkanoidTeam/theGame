import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs/promises'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import express, { Request as ExpressRequest } from 'express'
import path from 'path'

const port = process.env.PORT || 80
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'

async function createServer() {
  const app = express()

  let vite: ViteDevServer | undefined
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false })
    )
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    let render: (req: ExpressRequest) => Promise<{ html: string }>
    let template: string
    if (vite) {
      template = await fs.readFile(
        path.resolve(clientPath, 'index.html'),
        'utf-8'
      )

      template = await vite.transformIndexHtml(url, template)

      render = (
        await vite.ssrLoadModule(path.join(clientPath, 'src/entry-server.tsx'))
      ).render
    } else {
      template = await fs.readFile(
        path.join(clientPath, 'dist/client/index.html'),
        'utf-8'
      )

      const pathToServer = path.join(clientPath, 'dist/server/entry-server.js')

      render = (await import(pathToServer)).render
    }

    const { html: rootHtml } = await render(req)

    const html = template.replace(`<!--outlet-->`, rootHtml)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  })

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`)
  })
}

createServer()
