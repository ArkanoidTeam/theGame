enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type HTTPMethod = (path: string, options: RequestInit) => Promise<Response>
type Request = (path: string, options: RequestInit) => Promise<Response>

export default class Http {
  _baseApiUri = ''
  _baseApiUrl = ''

  constructor(baseApiUri: string) {
    this._baseApiUri = baseApiUri
  }

  get: HTTPMethod = (path, options) => {
    return this.request(path, { method: METHODS.GET, ...options })
  }
  post: HTTPMethod = (path, options) => {
    return this.request(path, { method: METHODS.POST, ...options })
  }
  put: HTTPMethod = (path, options) => {
    return this.request(path, { method: METHODS.PUT, ...options })
  }
  delete: HTTPMethod = (path, options) => {
    return this.request(path, { method: METHODS.DELETE, ...options })
  }

  request: Request = (path, options) => {
    return new Promise((resolve, reject) => {
      fetch(this._baseApiUri + path, options)
        .then(res => {
          const contentType = res.headers.get('Content-Type')
          if (contentType?.includes('application/json')) {
            return res.json()
          } else if (contentType?.includes('text/plain')) {
            return res.text()
          }
          return res
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}
