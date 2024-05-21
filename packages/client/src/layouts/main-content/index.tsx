import React, { FC } from 'react'

export const MainContent: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log(children)
  return <div>{children}</div>
}
