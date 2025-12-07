import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { petService } from '../services/petService';
import { PetCard } from '../components/PetCard';
import { Button } from '../components/ui/Button';

export const PetsPage = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    minAge: '',
    maxAge: '',
  });

  const petTypes = [
    'Все',
    'Собака',
    'Кошка',
    'Кролик',
    'Птица',
    'Рыба',
    'Грызун',
    'Рептилия',
  ];

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const data = await petService.getAllPets({ status: 'approved' });
        setPets(data);
        setFilteredPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    let result = pets;

    // Поиск по имени и описанию
    if (searchTerm) {
      result = result.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Фильтр по типу
    if (filters.type && filters.type !== 'Все') {
      result = result.filter((pet) => pet.type === filters.type);
    }

    // Фильтр по возрасту
    if (filters.minAge) {
      result = result.filter((pet) => pet.age >= parseInt(filters.minAge));
    }
    if (filters.maxAge) {
      result = result.filter((pet) => pet.age <= parseInt(filters.maxAge));
    }

    setFilteredPets(result);
  }, [searchTerm, filters, pets]);

  const handleReport = (petId) => {
    alert(`Жалоба на объявление #${petId} будет рассмотрена администратором`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🐾 Найти питомца
            </h1>
            <p className="text-gray-600">
              {filteredPets.length} животных найдено
            </p>
          </div>
          <Button
            onClick={() => navigate('/create-ad')}
            className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Подать объявление
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск по имени, породе..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="inline w-4 h-4 mr-2" />
                Вид животного
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {petTypes.map((type) => (
                  <option key={type} value={type === 'Все' ? '' : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Возраст от
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={filters.minAge}
                onChange={(e) => setFilters({ ...filters, minAge: e.target.value })}
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Max Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Возраст до
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={filters.maxAge}
                onChange={(e) => setFilters({ ...filters, maxAge: e.target.value })}
                placeholder="50"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ type: '', minAge: '', maxAge: '' });
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg py-2 px-4 transition"
              >
                Очистить
              </button>
            </div>
          </div>
        </div>

        {/* Pets Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <Loader className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : filteredPets.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">Животные не найдены</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilters({ type: '', minAge: '', maxAge: '' });
              }}
              className="mt-4 text-blue-500 hover:text-blue-600 underline"
            >
              Очистить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onReport={handleReport} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
