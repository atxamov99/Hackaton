import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to <span className="text-blue-600">Hackaton</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Build something amazing. Start your journey today.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/auth/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold mb-2">Fast</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Lightning fast performance with modern technologies.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold mb-2">Secure</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Built with security best practices in mind.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-2">Scalable</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Designed to grow with your needs.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
