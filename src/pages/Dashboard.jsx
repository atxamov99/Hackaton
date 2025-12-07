import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  const stats = [
    { label: 'Total Projects', value: '12', icon: '📁', color: 'blue' },
    { label: 'Completed', value: '8', icon: '✅', color: 'green' },
    { label: 'In Progress', value: '3', icon: '🔄', color: 'yellow' },
    { label: 'Pending', value: '1', icon: '⏳', color: 'red' },
  ]

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here's what's happening with your projects today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  📝
                </div>
                <div>
                  <p className="font-medium">Project updated</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {i} hour ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
              <span className="text-2xl">➕</span>
              <p className="mt-2 font-medium">New Project</p>
            </button>
            <button className="p-4 bg-green-100 dark:bg-green-900 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
              <span className="text-2xl">📊</span>
              <p className="mt-2 font-medium">View Reports</p>
            </button>
            <button className="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
              <span className="text-2xl">👥</span>
              <p className="mt-2 font-medium">Team</p>
            </button>
            <button className="p-4 bg-orange-100 dark:bg-orange-900 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors">
              <span className="text-2xl">⚙️</span>
              <p className="mt-2 font-medium">Settings</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
