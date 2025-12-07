import React, { useState, useEffect } from 'react';
import { Trash2, Check, X, AlertCircle, Loader } from 'lucide-react';
import { petService, reportService, userService } from '../services/petService';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('listings');
  const [listings, setListings] = useState([]);
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [listingsData, reportsData, usersData] = await Promise.all([
          petService.getAllPets(),
          reportService.getReports(),
          userService.getAllUsers(),
        ]);

        setListings(listingsData);
        setReports(reportsData);
        setUsers(usersData.filter((u) => u.role === 'user'));
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApproveListing = async (id) => {
    try {
      await petService.updatePet(id, { status: 'approved' });
      setListings(listings.map((l) => (l.id === id ? { ...l, status: 'approved' } : l)));
      alert('Объявление одобрено');
    } catch (error) {
      console.error('Error approving listing:', error);
      alert('Ошибка при одобрении объявления');
    }
  };

  const handleRejectListing = async (id) => {
    try {
      await petService.deletePet(id);
      setListings(listings.filter((l) => l.id !== id));
      alert('Объявление отклонено');
    } catch (error) {
      console.error('Error rejecting listing:', error);
      alert('Ошибка при отклонении объявления');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Вы уверены?')) return;

    try {
      // json-server не поддерживает удаление, но в реальном приложении это работало бы
      setUsers(users.filter((u) => u.id !== id));
      alert('Пользователь удален');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Ошибка при удалении пользователя');
    }
  };

  const handleResolveReport = async (id) => {
    try {
      await reportService.updateReportStatus(id, 'resolved');
      setReports(reports.map((r) => (r.id === id ? { ...r, status: 'resolved' } : r)));
      alert('Жалоба обработана');
    } catch (error) {
      console.error('Error resolving report:', error);
      alert('Ошибка при обработке жалобы');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">⚙️ Админ Панель</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {[
            { id: 'listings', label: 'Объявления', icon: '📋' },
            { id: 'reports', label: 'Жалобы', icon: '🚨' },
            { id: 'users', label: 'Пользователи', icon: '👥' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Объявления ({listings.length})
            </h2>
            {listings.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                Объявлений нет
              </div>
            ) : (
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div key={listing.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div className="flex items-center gap-4">
                        <img
                          src={listing.image}
                          alt={listing.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-bold text-gray-800">{listing.name}</h3>
                          <p className="text-sm text-gray-600">{listing.breed}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Владелец</p>
                        <p className="font-medium">{listing.owner_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Статус</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            listing.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {listing.status === 'approved' ? 'Одобрено' : 'На рассмотрении'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {listing.status !== 'approved' && (
                          <Button
                            onClick={() => handleApproveListing(listing.id)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          onClick={() => handleRejectListing(listing.id)}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Жалобы ({reports.length})</h2>
            {reports.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                Жалоб нет
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-2">
                          Жалоба на объявление #{report.pet_id}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Причина:</strong> {report.reason}
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                          <strong>Описание:</strong> {report.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          От пользователя ID: {report.user_id} | Дата:{' '}
                          {new Date(report.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            report.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {report.status === 'pending' ? 'На рассмотрении' : 'Обработана'}
                        </span>
                        {report.status === 'pending' && (
                          <Button
                            onClick={() => handleResolveReport(report.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Пользователи ({users.length})
            </h2>
            {users.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                Пользователей нет
              </div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                        Имя
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                        Телефон
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                        Рейтинг
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-3 text-sm text-gray-800">{user.name}</td>
                        <td className="px-6 py-3 text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-3 text-sm text-gray-600">{user.phone}</td>
                        <td className="px-6 py-3 text-sm">
                          <span className="text-yellow-500">★ {user.rating}</span>
                        </td>
                        <td className="px-6 py-3 text-sm">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
