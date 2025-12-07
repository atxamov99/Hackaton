import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Globe, Heart, Users } from 'lucide-react';
import { shelterService } from '../services/petService';
import { Button } from '../components/ui/Button';

export const SheltersPage = () => {
  const [shelters, setShelters] = useState([]);
  const [filteredShelters, setFilteredShelters] = useState([]);
  const [_loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('Все');

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        setLoading(true);
        const data = await shelterService.getAllShelters();
        setShelters(data);
        setFilteredShelters(data);
      } catch (error) {
        console.error('Error fetching shelters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }, []);

  useEffect(() => {
    if (filterType === 'Все') {
      setFilteredShelters(shelters);
    } else {
      setFilteredShelters(shelters.filter((s) => s.type === filterType));
    }
  }, [filterType, shelters]);

  const shelterTypes = ['Все', 'Собаки', 'Кошки', 'Ветеринарная клиника'];

  const openMap = (shelter) => {
    const mapUrl = `https://www.google.com/maps/search/${shelter.coordinates.lat},${shelter.coordinates.lng}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🏥 Приюты и клиники</h1>
        <p className="text-gray-600 mb-8">
          Найдите приют для животных или ветеринарную клинику рядом с вами
        </p>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {shelterTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition ${
                filterType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 border border-gray-300 hover:border-blue-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Shelters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredShelters.map((shelter) => (
            <div key={shelter.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              {/* Image */}
              <img
                src={shelter.image}
                alt={shelter.name}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{shelter.name}</h3>
                <p className="text-sm bg-blue-100 text-blue-800 inline-block px-3 py-1 rounded-full mb-4">
                  {shelter.type}
                </p>

                <p className="text-gray-600 mb-4 line-clamp-2">{shelter.description}</p>

                {/* Info Grid */}
                <div className="space-y-3 mb-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-600">{shelter.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-500" />
                    <a href={`tel:${shelter.phone}`} className="text-blue-500 hover:underline">
                      {shelter.phone}
                    </a>
                  </div>

                  {shelter.email && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-purple-500" />
                      <a href={`mailto:${shelter.email}`} className="text-blue-500 hover:underline">
                        {shelter.email}
                      </a>
                    </div>
                  )}

                  {shelter.animals_count > 0 && (
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-700">{shelter.animals_count} животных</span>
                    </div>
                  )}
                </div>

                {/* Website */}
                {shelter.website && (
                  <div className="mb-4">
                    <a
                      href={`https://${shelter.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      🌐 {shelter.website}
                    </a>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => openMap(shelter)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    На карте
                  </Button>
                  <a
                    href={`tel:${shelter.phone}`}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-4 transition flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Звонить
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📍 Расположение на карте</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              width="100%"
              height="500"
              frameBorder="0"
              title="Shelters Map"
              src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d191837.30321312314!2d69.179756!3d41.298889!3m2!1i1024!2i768!4f13.1!2m1!1s%D0%BF%D1%80%D0%B8%D1%8E%D1%82%D1%8B%20%D0%B6%D0%B8%D0%B2%D0%BE%D1%82%D0%BD%D1%8B%D1%85%20%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82!5e0!3m2!1sru!2suz!4v1234567890"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
