import type { Options } from 'swagger-jsdoc'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import { Router } from 'express'

const router = Router()

const options: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Arkanoid Game API',
      version: '1.0.0',
      description: 'Arkanoid Game API',
    },
    servers: [
      {
        url: `http://localhost:${process.env.SERVER_PORT}/api`,
      },
    ],
    paths: {
      '/forum/topics': {
        post: {
          summary: 'Создание нового топика',
          tags: ['Topics'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Topic',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Успешное создание топика',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Topic' },
                  },
                  example: {
                    id: 1,
                    title: 'Название топика',
                    text: 'Текст топика',
                    user_login: 'user123',
                    updatedAt: '2024-07-10T19:09:42.599Z',
                    createdAt: '2024-07-10T19:09:42.599Z',
                  },
                },
              },
            },
            '500': {
              description: 'Ошибка сервера',
            },
          },
        },
        get: {
          summary: 'Возвращает список топиков',
          tags: ['Topics'],
          responses: {
            '201': {
              description: 'Успешное создание топика',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Topic' },
                  },
                  example: [
                    {
                      id: 1,
                      title: 'Название топика',
                      text: 'Текст топика',
                      user_login: 'user123',
                      updatedAt: '2024-07-10T19:09:42.599Z',
                      createdAt: '2024-07-10T19:09:42.599Z',
                    },
                  ],
                },
              },
            },
            '500': {
              description: 'Ошибка сервера',
            },
          },
        },
      },
      '/forum/topics/{id}': {
        get: {
          summary: 'Получение топика по id',
          tags: ['Topics'],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'id топика',
            },
          ],
          responses: {
            '200': {
              description: 'Успешный ответ',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Topic' },
                  example: {
                    id: 1,
                    title: 'Название топика',
                    text: 'Текст топика',
                    user_login: 'user123',
                    updatedAt: '2024-07-10T19:09:42.599Z',
                    createdAt: '2024-07-10T19:09:42.599Z',
                    messages: [],
                  },
                },
              },
            },
            '404': {
              description: 'Топик не найден',
            },
            '500': {
              description: 'Ошибка сервера',
            },
          },
        },
      },
      '/forum/messages': {
        post: {
          summary: 'Создание нового сообщения',
          tags: ['Messages'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Message',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Сообщение успешно создано',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Message' },
                  },
                  example: {
                    id: 1,
                    topic_id: 1,
                    parent_id: null,
                    text: 'Сообщение',
                    user_login: 'user123',
                    updatedAt: '2024-07-10T19:09:42.599Z',
                    createdAt: '2024-07-10T19:09:42.599Z',
                  },
                },
              },
            },
            '500': {
              description: 'Ошибка сервера',
            },
          },
        },
        get: {
          summary: 'Возвращает список всех сообщений',
          tags: ['Messages'],
          responses: {
            '200': {
              description: 'Список сообщений',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Message' },
                  },
                  example: [
                    {
                      id: 1,
                      topic_id: 1,
                      parent_id: null,
                      text: 'Сообщение',
                      user_login: 'user123',
                      updatedAt: '2024-07-10T19:09:42.599Z',
                      createdAt: '2024-07-10T19:09:42.599Z',
                    },
                  ],
                },
              },
            },
            '500': {
              description: 'Ошибка сервера',
            },
          },
        },
      },
      '/forum/messages/topic/{topic_id}': {
        get: {
          summary: 'Возвращает список сообщений топика',
          tags: ['Messages'],
          parameters: [
            {
              in: 'path',
              name: 'topic_id',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'id топика',
            },
          ],
          responses: {
            '200': {
              description: 'Список сообщений топика',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Message' },
                  },
                  example: [
                    {
                      id: 1,
                      topic_id: 1,
                      parent_id: null,
                      text: 'Сообщение',
                      user_login: 'user123',
                      updatedAt: '2024-07-10T19:09:42.599Z',
                      createdAt: '2024-07-10T19:09:42.599Z',
                    },
                  ],
                },
              },
            },
            '404': {
              description: 'Сообщения топика не найдены',
            },
            '500': {
              description: 'Ошибка сервера',
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Topic: {
          type: 'object',
          required: {
            title: {
              type: 'string',
            },
            text: {
              type: 'string',
            },
            user_login: {
              type: 'string',
            },
          },
          properties: {
            title: {
              type: 'string',
              description: 'Название топика',
            },
            text: {
              type: 'string',
              description: 'Текст топика',
            },
            user_login: {
              type: 'string',
              description: 'Логин пользователя, создавшего топик',
            },
          },
        },
        Message: {
          type: 'object',
          required: {
            topic_id: {
              type: 'integer',
            },
            text: {
              type: 'string',
            },
            user_login: {
              type: 'string',
            },
          },
          properties: {
            topic_id: {
              type: 'integer',
              description: 'id топика',
              required: true,
            },
            parent_id: {
              type: 'integer',
              description:
                'id родительского сообщения (для возможности ответов на сообщения)',
              required: true,
            },
            text: {
              type: 'string',
              description: 'Текст сообщения',
            },
            user_login: {
              type: 'string',
              description: 'Логин пользователя, создавшего сообщение',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.ts'],
}

const specs = swaggerJsdoc(options)
router.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

export default router
