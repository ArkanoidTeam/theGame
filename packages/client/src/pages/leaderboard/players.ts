export interface Player {
  name: string
  score: number
  isYou: boolean
  imgSrc: string
}

const players: Player[] = [
  {
    name: 'player 1',
    score: 30254,
    isYou: false,
    imgSrc: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
  },
  {
    name: 'player isYou',
    score: 20254,
    isYou: true,
    imgSrc: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
  },
  {
    name: 'player 3',
    score: 1254,
    isYou: false,
    imgSrc: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
  },
  {
    name: 'player 4',
    score: 354,
    isYou: false,
    imgSrc: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
  },
  {
    name: 'player 5',
    score: 54,
    isYou: false,
    imgSrc: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
  },
  {
    name: 'player 6',
    score: 5,
    isYou: false,
    imgSrc: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
  },
]

export default players
