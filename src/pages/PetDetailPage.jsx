import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MapPin, User, MessageSquare, AlertCircle, ArrowLeft, Loader } from 'lucide-react';
import { petService, reportService, userService } from '../services/petService';
import { ChatComponent } from '../components/ChatComponent';
import { Button } from '../components/ui/Button';

export const PetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [currentUserId] = useState(1); // В реальности из контекста
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [showReportForm, setShowReportForm] = useState(false);
  const [submittingReport, setSubmittingReport] = useState(false);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        setLoading(true);
        const petData = await petService.getPetById(id);
        setPet(petData);

        const userData = await userService.getUserById(petData.owner_id);
        setOwner(userData);
      } catch (error) {
        console.error('Error fetching pet details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);

  const handleReport = async (e) => {
    e.preventDefault();
    if (!reportReason || !reportDescription) {
      alert('Заполните все поля');
      return;
    }

    try {
      setSubmittingReport(true);
      await reportService.createReport({
        pet_id: parseInt(id),
        user_id: currentUserId,
        reason: reportReason,
        description: reportDescription,
      });
      alert('Жалоба успешно отправлена');
      setShowReportForm(false);
      setReportReason('');
      setReportDescription('');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Ошибка при отправке жалобы');
    } finally {
      setSubmittingReport(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!pet) {
    return <div className="text-center mt-10">Животное не найдено</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/pets')}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад к объявлениям
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={pet.image} alt={pet.name} className="w-full h-96 object-cover" />
            </div>

            {/* Pet Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{pet.name}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <span className="text-lg">{pet.type}</span>
                <span>•</span>
                <span>{pet.breed}</span>
                <span>•</span>
                <span>{pet.age} {pet.age === 1 ? 'год' : 'лет'}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Тип животного</p>
                  <p className="font-bold text-gray-800">{pet.type}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Возраст</p>
                  <p className="font-bold text-gray-800">
                    {pet.age} {pet.age === 1 ? 'год' : 'лет'}
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-3">Описание</h2>
              <p className="text-gray-700 leading-relaxed">{pet.description}</p>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-blue-500 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800">Местоположение</h3>
                  <p className="text-gray-600">{pet.location}</p>
                </div>
              </div>
            </div>

            {/* Chat */}
            {showChat && owner && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Диалог с продавцом</h2>
                <ChatComponent
                  currentUserId={currentUserId}
                  otherUserId={owner.id}
                  petId={pet.id}
                  petName={pet.name}
                  ownerName={owner.name}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Card */}
            {owner && (
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <div className="text-center mb-6">
                  <img
                    src={owner.avatar}
                    alt={owner.name}
                    className="w-16 h-16 rounded-full mx-auto mb-3 border-4 border-blue-200"
                  />
                  <h3 className="font-bold text-lg text-gray-800">{owner.name}</h3>
                  <p className="text-yellow-500">★ {owner.rating}</p>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{owner.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{owner.address}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => setShowChat(!showChat)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {showChat ? 'Скрыть чат' : 'Написать продавцу'}
                  </Button>
                  <button
                    onClick={() => setShowReportForm(!showReportForm)}
                    className="w-full border-2 border-red-300 text-red-600 hover:bg-red-50 rounded-lg py-2 px-4 transition flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Пожаловаться админу
                  </button>
                </div>

                {pet.price > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-gray-600 text-sm mb-2">Цена</p>
                    <p className="text-3xl font-bold text-gray-800">{pet.price}$</p>
                  </div>
                )}
              </div>
            )}

            {/* Report Form */}
            {showReportForm && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Пожаловаться</h3>
                <form onSubmit={handleReport} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Причина
                    </label>
                    <select
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Выберите причину</option>
                      <option value="Мошенничество">Мошенничество</option>
                      <option value="Неправдивое описание">Неправдивое описание</option>
                      <option value="Жестокое обращение">Жестокое обращение</option>
                      <option value="Спам">Спам</option>
                      <option value="Другое">Другое</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Описание
                    </label>
                    <textarea
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      placeholder="Опишите проблему..."
                      className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submittingReport}
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                  >
                    {submittingReport ? 'Отправка...' : 'Отправить жалобу'}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
