import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    language: localStorage.getItem('language') || 'uz',
    currency: localStorage.getItem('currency') || 'UZS',
    isOnline: navigator.onLine,
  })

  const setLanguage = useCallback((lang) => {
    setAppState((prev) => ({ ...prev, language: lang }))
    localStorage.setItem('language', lang)
  }, [])

  const setCurrency = useCallback((currency) => {
    setAppState((prev) => ({ ...prev, currency }))
    localStorage.setItem('currency', currency)
  }, [])

  const value = {
    ...appState,
    setLanguage,
    setCurrency,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export default AppContext
