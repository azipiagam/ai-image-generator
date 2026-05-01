import { createContext, useContext } from 'react'

const LayoutHeaderActionsContext = createContext(null)

export function useLayoutHeaderActions() {
  const contextValue = useContext(LayoutHeaderActionsContext)

  if (contextValue === null) {
    throw new Error('useLayoutHeaderActions must be used within LayoutHeaderActionsContext')
  }

  return contextValue
}

export default LayoutHeaderActionsContext
