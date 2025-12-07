import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">🐾 Pet Tashkent</h3>
            <p className="text-gray-400">
              Платформа для любителей животных и поиска идеального питомца.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/pets" className="hover:text-blue-400 transition">
                  Животные
                </Link>
              </li>
              <li>
                <Link to="/shelters" className="hover:text-blue-400 transition">
                  Приюты
                </Link>
              </li>
              <li>
                <Link to="/create-ad" className="hover:text-blue-400 transition">
                  Подать объявление
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-lg font-bold mb-4">Информация</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  О нас
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Политика приватности
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Условия использования
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Контакты</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+998712345678" className="hover:text-blue-400 transition">
                  +998 71 234 56 78
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@pettashkent.uz" className="hover:text-blue-400 transition">
                  info@pettashkent.uz
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Ташкент, Узбекистан</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              Telegram
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              WhatsApp
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500">
            <p className="flex items-center justify-center gap-2 mb-2">
              Сделано с <Heart className="w-4 h-4 text-red-500" /> для любителей животных
            </p>
            <p>&copy; 2025 Pet Tashkent. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};