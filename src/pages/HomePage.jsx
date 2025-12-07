import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, MapPin, MessageSquare, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Найди своего питомца',
      description: 'Тысячи объявлений о животных, ждущих своего хозяина',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Общайся напрямую',
      description: 'Встроенный чат для обсуждения с продавцом или владельцем приюта',
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Найди приют рядом',
      description: 'Справочник всех приютов и ветеринарных клиник города',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Безопасность',
      description: 'Защита от мошенников благодаря модерации и системе отчетов',
    },
  ];

  return (
    <div className="bg-linear-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center py-12">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                🐾 Pet Tashkent
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Шаҳар ҳайвонлар экотизими
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Найди идеального питомца, свяжись с приютами, получи консультацию у ветеринаров.
                Все в одном месте для любителей животных!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate('/pets')}
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
                >
                  Найти питомца
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  onClick={() => navigate('/create-ad')}
                  className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
                >
                  Подать объявление
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-blue-600">500+</p>
                  <p className="text-sm text-gray-600">Животных</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-green-600">50+</p>
                  <p className="text-sm text-gray-600">Приютов</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-purple-600">10K+</p>
                  <p className="text-sm text-gray-600">Пользователей</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-200 to-blue-100 rounded-full filter blur-3xl opacity-70"></div>
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop"
                alt="Happy pets"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Почему выбирать Pet Tashkent?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-blue-50 to-purple-50 rounded-lg p-6 hover:shadow-lg transition"
              >
                <div className="text-blue-500 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Как это работает?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Найди',
                description: 'Просмотри объявления о животных с фильтром по виду и возрасту',
              },
              {
                step: '2',
                title: 'Свяжись',
                description: 'Напиши сообщение владельцу через встроенный чат',
              },
              {
                step: '3',
                title: 'Посети',
                description: 'Встреться с животным и его владельцем',
              },
              {
                step: '4',
                title: 'Заботься',
                description: 'Встреться с животным и его владельцем',
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                {index < 3 && (
                  <div className="absolute top-12 left-[calc(100%+20px)] w-12 h-0.5 bg-blue-300 md:block hidden"></div>
                )}
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="flex bg-blue-500 text-white w-12 h-12 rounded-full items-center justify-center text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Какого питомца ты ищешь?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: '🐕', name: 'Собаки', count: '120+' },
              { emoji: '🐈', name: 'Кошки', count: '95+' },
              { emoji: '🐰', name: 'Кролики', count: '45+' },
              { emoji: '🦜', name: 'Птицы', count: '32+' },
              { emoji: '🐠', name: 'Рыбы', count: '28+' },
              { emoji: '🐹', name: 'Грызуны', count: '38+' },
              { emoji: '🦎', name: 'Рептилии', count: '15+' },
              { emoji: '🐰', name: 'Другие', count: '50+' },
            ].map((cat, index) => (
              <button
                key={index}
                onClick={() => navigate('/pets')}
                className="bg-linear-to-br from-blue-100 to-purple-100 hover:shadow-lg rounded-lg p-6 text-center transition hover:scale-105"
              >
                <div className="text-4xl mb-2">{cat.emoji}</div>
                <h3 className="font-bold text-gray-800">{cat.name}</h3>
                <p className="text-sm text-gray-600">{cat.count}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-blue-500 to-blue-600">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Готов найти своего питомца?</h2>
          <p className="text-xl mb-8 opacity-90">
            Начни поиск прямо сейчас и найди идеального друга
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/pets')}
              className="bg-white text-blue-600 hover:bg-gray-100 flex items-center justify-center gap-2"
            >
              Просмотреть объявления
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => navigate('/shelters')}
              className="bg-blue-400 hover:bg-blue-300 text-white flex items-center justify-center gap-2"
            >
              Найти приют
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
