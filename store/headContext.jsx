import { createContext } from 'react'

export const headContext = createContext({
  title: 'NextJs events',
  setTitle: () => {},
  description: 'check amazing events ',
  setDescription: () => {},
})
