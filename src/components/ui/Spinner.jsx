import { classNames } from '../../utils/helpers'

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}

const Spinner = ({ size = 'md', className = '' }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={classNames(
          'animate-spin rounded-full border-4 border-gray-200 border-t-blue-600',
          sizes[size],
          className
        )}
      />
    </div>
  )
}

export default Spinner
