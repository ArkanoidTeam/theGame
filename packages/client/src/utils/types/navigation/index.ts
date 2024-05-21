enum ViewGroupKeys {
  Games,
}

enum ViewKeys {
  Arkanoid,
}

export interface IMenuItem {
  key: string
  uri: string
  title: string
}

export type ViewGroupItems = {
  [id in keyof typeof ViewGroupKeys]: IMenuItem
}

export type ViewItems = {
  [id in keyof typeof ViewKeys]: IMenuItem
}
