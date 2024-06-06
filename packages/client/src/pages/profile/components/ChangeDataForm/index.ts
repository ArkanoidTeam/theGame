import {
  ValidationType,
  validationPatterns,
} from '../../../../utils/validation'

export const fields = {
  login: {
    label: 'Логин',
    placeholder: 'Логин',
    type: 'text',
    autocomplete: 'username',
    pattern: validationPatterns[ValidationType.LOGIN],
  },
  email: {
    label: 'Почта',
    placeholder: 'Почта',
    type: 'email',
    autocomplete: 'email',
    pattern: validationPatterns[ValidationType.EMAIL],
  },
  first_name: {
    label: 'Имя',
    placeholder: 'Имя',
    type: 'text',
    autocomplete: 'given-name',
    pattern: validationPatterns[ValidationType.USER],
  },
  second_name: {
    label: 'Фамилия',
    placeholder: 'Фамилия',
    type: 'text',
    autocomplete: 'family-name',
    pattern: validationPatterns[ValidationType.USER],
  },
  phone: {
    label: 'Телефон',
    placeholder: '+7 (000) 000-00-00',
    type: 'tel',
    autocomplete: 'tel',
    pattern: validationPatterns[ValidationType.PHONE],
  },
}
