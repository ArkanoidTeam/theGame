/**
 * Функция принимает на вход дату в формате строки или даты и возвращает нормализованную дату или время
 * @param inpDate дата в формате строки или даты
 * @param returnStringType типа возвращаемой даты:
 * - full - 16.04.2024 08:00:00
 * - fullNoSecs - 16.04.2024 08:00
 * - date - 16.04.2024
 * - fullTime - 08:00:00
 * - timeNoSecs - 08:00
 */

type TStringTypes = 'date' | 'full' | 'fullNoSecs' | 'fullTime' | 'timeNoSecs'

export default function getDateTimeString(
  inpDate: string | Date,
  returnStringType?: TStringTypes
) {
  const date = new Date(inpDate)

  const day = dateElemNormalize(date.getDate())
  const month = dateElemNormalize(date.getMonth() + 1)
  const year = String(date.getFullYear())

  const hours = dateElemNormalize(date.getHours())
  const minutes = dateElemNormalize(date.getMinutes())
  const seconds = dateElemNormalize(date.getSeconds())

  switch (returnStringType) {
    case 'date':
      return `${day}.${month}.${year}`
    case 'fullTime':
      return `${hours}:${minutes}:${seconds}`
    case 'timeNoSecs':
      return `${hours}:${minutes}`
    case 'fullNoSecs':
      return `${day}.${month}.${year} ${hours}:${minutes}`
    case 'full':
    default:
      return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
  }
}

function dateElemNormalize(elem: number) {
  if (elem > 9) {
    return String(elem)
  }
  return '0' + elem
}
