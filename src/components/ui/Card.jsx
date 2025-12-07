import { classNames } from '../../utils/helpers'

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={classNames(
        'bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ children, className = '' }) => (
  <div className={classNames('px-6 py-4 border-b dark:border-gray-700', className)}>
    {children}
  </div>
)

const CardBody = ({ children, className = '' }) => (
  <div className={classNames('p-6', className)}>{children}</div>
)

const CardFooter = ({ children, className = '' }) => (
  <div className={classNames('px-6 py-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900', className)}>
    {children}
  </div>
)

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
