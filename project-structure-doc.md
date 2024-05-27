# Структура проекта
```
dist/
public/
|   ├── index.html
|   └── favicon.ico
assets/
|	  ├── fonts/
|	  |    ........
|  	├── styles/
|	  |    └── common.scss
|   └── icons/
|			   └── icons.ts
src/
├── api/
|		└── public.ts
├── components/
│   └── form/
│       ├── form.scss
│       ├── form.ts
│       └── index.ts
├── hoc/
|   ......
├── hooks/
|   ......
├── modules/
│   ├── login-form/
│   |   ├── utils/
|		│   │   └── validate.ts
│   |   ├── components/
│   |   ├── login-form.scss
│   |   ├── login-form.ts
│   |   └── index.ts
│   └── registration-form/
│       ├── utils/
│       │   └── validate.ts
│       ├── components/
│       ├── login-form.scss
│       ├── login-form.ts
│       └── index.ts
|       .................
├── pages/
│   ├── login/
│   │   ├── components/
│   │   ├── login.scss
│   │   ├── login.ts
│   │   └── index.ts
│   └── registration/
│				├── components/
│       ├── registration.scss
│       ├── registration.ts
│       └── index.ts
|       ...............
├── utils/
|    ├── isEmpty.ts
|    └── validate.ts
├── routes/
|    └── routes.ts
├── store/
|   .......
└── types/
    .......
```

## Папка `dist`

Билд проекта

## Папка `public`

- index.html
- favicon.ico

## Папка `src`

Структура приложения

## Папка `src/api`

Логика работы с бэком

## Папка `src/components`

Простые компоненты, которые могут использоваться в разных частях приложения: формы, модальные окна и пр.

## Папка `src/hoc`

HOC-компоненты

## Папка `src/hooks`

Пользовательские хуки

## Папка `src/modules`

Сложные компоненты которые могут использоваться в разных частях приложения

## Папка `src/pages`

Страницы приложения

## Папка `src/utils`

Общие функции и утилиты

## Папка `src/routes`

Роуты

## Папка `src/store`

Хранилище состояния приложения

## Папка `src/types`

Общие типы
