const About = () => {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        About Us
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
          We are a team of passionate developers building innovative solutions
          for the modern web. Our mission is to create tools that make
          development faster, easier, and more enjoyable.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-400">
              To empower developers with the best tools and technologies to
              build amazing applications.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A world where everyone can create and share their ideas through
              technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
