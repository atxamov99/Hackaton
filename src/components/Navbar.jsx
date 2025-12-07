import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            🐾 Pet Tashkent
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
              Главная
            </Link>
            <Link to="/pets" className="text-gray-700 hover:text-blue-600 transition">
              Животные
            </Link>
            <Link to="/shelters" className="text-gray-700 hover:text-blue-600 transition">
              Приюты
            </Link>
            <Link to="/create-ad" className="text-gray-700 hover:text-blue-600 transition">
              Подать объявление
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Админ панель
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Вход
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded"
              onClick={() => setIsOpen(false)}
            >
              Главная
            </Link>
            <Link
              to="/pets"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded"
              onClick={() => setIsOpen(false)}
            >
              Животные
            </Link>
            <Link
              to="/shelters"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded"
              onClick={() => setIsOpen(false)}
            >
              Приюты
            </Link>
            <Link
              to="/create-ad"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded"
              onClick={() => setIsOpen(false)}
            >
              Подать объявление
            </Link>

            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-red-600 hover:bg-red-50 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Админ панель
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 rounded"
                >
                  Выход
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 bg-blue-500 text-white rounded text-center"
                onClick={() => setIsOpen(false)}
              >
                Вход
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
