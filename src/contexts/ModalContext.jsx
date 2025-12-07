import { createContext, useContext, useState, useCallback } from 'react'

const ModalContext = createContext(null)

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([])

  const openModal = useCallback((component, props = {}) => {
    const id = Date.now()
    setModals((prev) => [...prev, { id, component, props }])
    return id
  }, [])

  const closeModal = useCallback((id) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id))
  }, [])

  const closeAllModals = useCallback(() => {
    setModals([])
  }, [])

  const value = {
    modals,
    openModal,
    closeModal,
    closeAllModals,
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modals.map(({ id, component: Component, props }) => (
        <div
          key={id}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => closeModal(id)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Component {...props} onClose={() => closeModal(id)} />
          </div>
        </div>
      ))}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export default ModalContext
