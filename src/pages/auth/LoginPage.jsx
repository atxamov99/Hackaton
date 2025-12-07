import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Loader } from 'lucide-react';
import { userService } from '../services/petService';
import { Button } from '../../components/ui/Button';


export const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Заполните все поля');
      return;
    }

    try {
      setLoading(true);
      const user = await userService.login(formData.email, formData.password);
      
      // Сохраняем пользователя в localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/pets');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Неверный email или пароль');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.phone ||
      !formData.address
    ) {
      alert('Заполните все поля');
      return;
    }

    try {
      setLoading(true);
      const newUser = await userService.register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
      });

      localStorage.setItem('user', JSON.stringify(newUser));
      alert('Регистрация успешна!');
      navigate('/pets');
    } catch (error) {
      console.error('Register error:', error);
      alert('Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  // Демо учетные данные
  const demoAccounts = [
    { email: 'aziz@example.com', password: '$2a$10$YjNpbHNjcGlkbg==', role: 'user' },
    { email: 'admin@example.com', password: '$2a$10$YWRtaW5wYXNz', role: 'admin' },
  ];

  const fillDemoData = (account) => {
    setFormData({
      ...formData,
      email: account.email,
      password: account.password,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🐾 Pet Tashkent</h1>
            <p className="text-gray-600">
              {isLogin ? 'Вход в аккаунт' : 'Создание аккаунта'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ваше имя"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+998 90 123-45-67"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Адрес</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Ваш адрес"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Загрузка...
                </>
              ) : isLogin ? (
                <>
                  <LogIn className="w-4 h-4" />
                  Вход
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Регистрация
                </>
              )}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({
                    email: '',
                    password: '',
                    name: '',
                    phone: '',
                    address: '',
                  });
                }}
                className="text-blue-500 hover:text-blue-600 ml-2 font-medium"
              >
                {isLogin ? 'Зарегистрируйся' : 'Войди'}
              </button>
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-3">📝 Демо учетные данные:</p>
            <div className="space-y-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => fillDemoData(account)}
                  className="w-full text-left text-sm bg-gray-50 hover:bg-gray-100 p-2 rounded border border-gray-200 transition"
                >
                  <div className="font-medium text-gray-800">{account.email}</div>
                  <div className="text-gray-600">{account.role === 'admin' ? '👑 Админ' : '👤 Пользователь'}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
