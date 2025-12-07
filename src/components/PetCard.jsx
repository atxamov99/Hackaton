import React from 'react';
import { Heart, MapPin, Phone, User, MessageSquare, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

export const PetCard = ({ pet, onReport }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/pet/${pet.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <div className="relative overflow-hidden h-48 bg-gray-200" onClick={handleCardClick}>
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-50">
          <Heart className="w-5 h-5 text-red-500" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div onClick={handleCardClick}>
            <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
            <p className="text-sm text-gray-600">
              {pet.breed} • {pet.age} {pet.age === 1 ? 'год' : 'лет'}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{pet.description}</p>

        <div className="space-y-2 mb-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{pet.owner_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{pet.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{pet.owner_phone}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCardClick}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Подробнее
          </Button>
          <button
            onClick={() => onReport?.(pet.id)}
            className="p-2 border border-red-300 text-red-500 rounded hover:bg-red-50 transition"
            title="Пожаловаться"
          >
            <AlertCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
