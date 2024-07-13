import ReactDOM from 'react-dom/server'
import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'

import AppRoutes from './routes'
import { Provider } from 'react-redux'
import store from './store'

export const createFetchRequest = (req: ExpressRequest) => {
  const url = new URL(
    req.originalUrl || req.url,
    `${req.protocol}://${req.get('host')}`
  )

  const controller = new AbortController()
  req.on('close', () => controller.abort())

  const headers = new Headers()

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  const init: {
    method: string
    headers: Headers
    signal: AbortSignal
    body?: any
  } = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}
export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(AppRoutes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)

  const html = ReactDOM.renderToString(
    <Provider store={store}>
      <StaticRouterProvider router={router} context={context} />
    </Provider>
  )

  return { html }
}
