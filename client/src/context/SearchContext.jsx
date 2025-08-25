// SearchContext.js
import { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export const SearchProvider = ({ children }) => {
  const [globalSearchTerm, setGlobalSearchTerm] = useState('')

  return (
    <SearchContext.Provider value={{
      globalSearchTerm,
      setGlobalSearchTerm
    }}>
      {children}
    </SearchContext.Provider>
  )
}