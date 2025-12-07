import { classNames } from '../../utils/helpers'

const Input = ({
  label,
  error,
  className = '',
  type = 'text',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        type={type}
        className={classNames(
          'w-full px-4 py-3 rounded-lg border transition-colors',
          'focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none',
          'dark:bg-gray-700 dark:border-gray-600',
          error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default Input
