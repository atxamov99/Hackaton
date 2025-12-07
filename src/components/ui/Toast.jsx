import { useEffect } from 'react'
import { classNames } from '../../utils/helpers'

const variants = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
}

const icons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
}

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={classNames(
        'fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg text-white shadow-lg z-50',
        variants[type]
      )}
    >
      <span className="text-lg">{icons[type]}</span>
      <p>{message}</p>
      <button onClick={onClose} className="ml-2 hover:opacity-80">
        ✕
      </button>
    </div>
  )
}

export default Toast
