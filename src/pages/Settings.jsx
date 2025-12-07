import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme, setPrimaryColor } from '../store'

const Settings = () => {
  const dispatch = useDispatch()
  const { mode, primaryColor } = useSelector((state) => state.theme)

  const colors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
  ]

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Settings
      </h1>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Appearance</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Toggle dark mode on or off
                </p>
              </div>
              <button
                onClick={() => dispatch(toggleTheme())}
                className={`w-14 h-7 rounded-full transition-colors ${
                  mode === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full transform transition-transform ${
                    mode === 'dark' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <p className="font-medium mb-3">Primary Color</p>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => dispatch(setPrimaryColor(color.value))}
                    className={`w-10 h-10 rounded-full border-4 ${
                      primaryColor === color.value
                        ? 'border-gray-900 dark:border-white'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Notifications</h3>
          <div className="space-y-4">
            {['Email', 'Push', 'SMS'].map((type) => (
              <div key={type} className="flex items-center justify-between">
                <p>{type} Notifications</p>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded text-blue-600"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Privacy</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p>Profile Visibility</p>
              <select className="px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700">
                <option>Public</option>
                <option>Private</option>
                <option>Friends Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
