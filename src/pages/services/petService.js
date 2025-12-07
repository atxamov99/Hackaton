const API_URL = 'http://localhost:3001';

export const petService = {
  // Получить все объявления
  getAllPets: async (filters = {}) => {
    try {
      let url = `${API_URL}/pets`;
      const params = new URLSearchParams();

      if (filters.type) params.append('type', filters.type);
      if (filters.minAge) params.append('age_gte', filters.minAge);
      if (filters.maxAge) params.append('age_lte', filters.maxAge);
      if (filters.status) params.append('status', filters.status);
      if (filters.search) {
        // Фильтруем на клиенте для поиска по названию
      }

      if (params.toString()) {
        url += '?' + params.toString();
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch pets');
      return await response.json();
    } catch (error) {
      console.error('Error fetching pets:', error);
      throw error;
    }
  },

  // Получить одно объявление
  getPetById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/pets/${id}`);
      if (!response.ok) throw new Error('Pet not found');
      return await response.json();
    } catch (error) {
      console.error('Error fetching pet:', error);
      throw error;
    }
  },

  // Создать объявление
  createPet: async (petData) => {
    try {
      const response = await fetch(`${API_URL}/pets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...petData,
          status: 'pending',
          created_at: new Date().toISOString().split('T')[0],
        }),
      });
      if (!response.ok) throw new Error('Failed to create pet');
      return await response.json();
    } catch (error) {
      console.error('Error creating pet:', error);
      throw error;
    }
  },

  // Обновить объявление
  updatePet: async (id, petData) => {
    try {
      const response = await fetch(`${API_URL}/pets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petData),
      });
      if (!response.ok) throw new Error('Failed to update pet');
      return await response.json();
    } catch (error) {
      console.error('Error updating pet:', error);
      throw error;
    }
  },

  // Удалить объявление
  deletePet: async (id) => {
    try {
      const response = await fetch(`${API_URL}/pets/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete pet');
      return await response.json();
    } catch (error) {
      console.error('Error deleting pet:', error);
      throw error;
    }
  },
};

export const userService = {
  // Получить всех пользователей
  getAllUsers: async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Получить пользователя по ID
  getUserById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`);
      if (!response.ok) throw new Error('User not found');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Авторизация
  login: async (email, password) => {
    try {
      const users = await this.getAllUsers();
      const user = users.find((u) => u.email === email);
      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Регистрация
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userData,
          role: 'user',
          rating: 5,
          created_at: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error('Failed to register');
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
};

export const messageService = {
  // Получить сообщения
  getMessages: async (params = {}) => {
    try {
      let url = `${API_URL}/messages`;
      const queryParams = new URLSearchParams();

      if (params.senderId) queryParams.append('sender_id', params.senderId);
      if (params.receiverId) queryParams.append('receiver_id', params.receiverId);
      if (params.petId) queryParams.append('pet_id', params.petId);

      if (queryParams.toString()) {
        url += '?' + queryParams.toString();
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch messages');
      return await response.json();
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Отправить сообщение
  sendMessage: async (messageData) => {
    try {
      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...messageData,
          created_at: new Date().toISOString(),
          read: false,
        }),
      });
      if (!response.ok) throw new Error('Failed to send message');
      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Отметить как прочитанное
  markAsRead: async (id) => {
    try {
      const response = await fetch(`${API_URL}/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });
      if (!response.ok) throw new Error('Failed to mark message as read');
      return await response.json();
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  },
};

export const reportService = {
  // Получить жалобы
  getReports: async (status = null) => {
    try {
      let url = `${API_URL}/reports`;
      if (status) {
        url += `?status=${status}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch reports');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  },

  // Создать жалобу
  createReport: async (reportData) => {
    try {
      const response = await fetch(`${API_URL}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...reportData,
          status: 'pending',
          created_at: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error('Failed to create report');
      return await response.json();
    } catch (error) {
      console.error('Error creating report:', error);
      throw error;
    }
  },

  // Обновить статус жалобы
  updateReportStatus: async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/reports/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update report');
      return await response.json();
    } catch (error) {
      console.error('Error updating report:', error);
      throw error;
    }
  },
};

export const shelterService = {
  // Получить приюты
  getAllShelters: async () => {
    try {
      const response = await fetch(`${API_URL}/shelters`);
      if (!response.ok) throw new Error('Failed to fetch shelters');
      return await response.json();
    } catch (error) {
      console.error('Error fetching shelters:', error);
      throw error;
    }
  },

  // Получить приют по ID
  getShelterById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/shelters/${id}`);
      if (!response.ok) throw new Error('Shelter not found');
      return await response.json();
    } catch (error) {
      console.error('Error fetching shelter:', error);
      throw error;
    }
  },
};
