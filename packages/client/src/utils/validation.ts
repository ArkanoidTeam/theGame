export enum ValidationType {
  USER = 'user',
  LOGIN = 'login',
  PASSOWRD = 'password',
  PHONE = 'phone',
  EMAIL = 'email',
}

type TValidationPattern = {
  value: RegExp
  message: string
}

export const validationPatterns: Record<ValidationType, TValidationPattern> = {
  [ValidationType.USER]: {
    value: /^[А-ЯЁ][a-яё-]+$/,
    message:
      'Поле должно содержать заглавную первую букву, не содержать пробелов, цифр и спецсимволов (кроме дефиса)',
  },
  [ValidationType.LOGIN]: {
    value: /^(?=.+[a-z])[a-z\d-_\s]{3,20}$/i,
    message:
      'Логин должен содержать от 3 до 20 символов, минимум одну латинскую букву, может содержать цифры, дефис и нижнее подчеркивание',
  },
  [ValidationType.PASSOWRD]: {
    value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}$/,
    message:
      'Пароль должен содержать от 8 до 40 символов, минимум одну заглавную букву и цифру',
  },
  [ValidationType.PHONE]: {
    value: /^((\+7|7|8)+([0-9]){10,15})$/,
    message:
      'Телефон должен содержать от 10 до 15 символов и состоять из цифр (может начинается с плюса)',
  },
  [ValidationType.EMAIL]: {
    value:
      /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    message: 'Некорректный формат email`а',
  },
}
