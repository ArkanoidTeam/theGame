interface Levels {
  [key: number]: string[][]
}

const level1 = [
  [],
  [],
  [],
  [],
  [],
  [],
  ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
  ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
  ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
  ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
  ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
  ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
]
const level2 = [
  [],
  [],
  [],
  [],
  [],
  [],
  ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
]

export const levels: Levels = {
  1: level1,
  2: level2,
} as const
