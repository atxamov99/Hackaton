import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const menuItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/dashboard', label: 'Dashboard', icon: '📊', protected: true },
  { path: '/profile', label: 'Profile', icon: '👤', protected: true },
  { path: '/settings', label: 'Settings', icon: '⚙️', protected: true },
  { path: '/about', label: 'About', icon: 'ℹ️' },
]

const Sidebar = () => {
  const location = useLocation()
  const { sidebarOpen } = useSelector((state) => state.ui)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const filteredItems = menuItems.filter(
    (item) => !item.protected || isAuthenticated
  )

  if (!sidebarOpen) return null

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 shadow-lg z-40 overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
