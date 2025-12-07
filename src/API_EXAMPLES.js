/**
 * ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ API
 * Pet Tashkent - Шахар ҳайвонлар экотизими
 */

import {
  petService,
  userService,
  messageService,
  reportService,
  shelterService,
} from './services/petService';

// ============================================
// 🐾 ЖИВОТНЫЕ (PETS)
// ============================================

/**
 * Получить все животные с фильтрацией
 */
export async function exampleGetAllPets() {
  try {
    // Без фильтров
    const allPets = await petService.getAllPets();
    console.log('Все животные:', allPets);

    // С фильтрами
    const filteredPets = await petService.getAllPets({
      type: 'Собака',
      minAge: 1,
      maxAge: 5,
      status: 'approved',
    });
    console.log('Отфильтрованные животные:', filteredPets);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

/**
 * Получить одного животного
 */
export async function exampleGetPetById(petId) {
  try {
    const pet = await petService.getPetById(petId);
    console.log('Животное:', pet);
    // Вывод:
    // {
    //   id: 1,
    //   name: 'Шарик',
    //   type: 'Собака',
    //   breed: 'Лабрадор',
    //   age: 3,
    //   image: 'https://...',
    //   description: '...',
    //   owner_id: 1,
    //   owner_name: 'Азиз',
    //   owner_phone: '+998 90 123-45-67',
    //   location: 'Ташкент',
    //   status: 'approved'
    // }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

/**
 * Создать новое объявление о животном
 */
export async function exampleCreatePet() {
  try {
    const newPet = await petService.createPet({
      name: 'Барсик',
      type: 'Кошка',
      breed: 'Сиамская',
      age: 2,
      image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e',
      description: 'Красивая сиамская кошка, очень ласковая. Все прививки сделаны.',
      owner_id: 5,
      owner_name: 'Сергей',
      owner_phone: '+998 94 567-89-01',
      price: 0,
      location: 'Ташкент, Сергелийский район',
    });
    console.log('Создано животное:', newPet);
  } catch (error) {
    console.error('Ошибка при создании:', error);
  }
}

/**
 * Обновить животное
 */
export async function exampleUpdatePet(petId) {
  try {
    const updated = await petService.updatePet(petId, {
      status: 'approved',
      description: 'Обновленное описание',
    });
    console.log('Обновлено:', updated);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

/**
 * Удалить объявление о животном
 */
export async function exampleDeletePet(petId) {
  try {
    await petService.deletePet(petId);
    console.log('Животное удалено');
  } catch (error) {
    console.error('Ошибка при удалении:', error);
  }
}

// ============================================
// 👥 ПОЛЬЗОВАТЕЛИ (USERS)
// ============================================

/**
 * Получить всех пользователей
 */
export async function exampleGetAllUsers() {
  try {
    const users = await userService.getAllUsers();
    console.log('Все пользователи:', users);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

/**
 * Получить пользователя по ID
 */
export async function exampleGetUserById(userId) {
  try {
    const user = await userService.getUserById(userId);
    console.log('Пользователь:', user);
    // {
    //   id: 1,
    //   email: 'aziz@example.com',
    //   name: 'Азиз',
    //   phone: '+998 90 123-45-67',
    //   role: 'user',
    //   avatar: 'https://...',
    //   address: 'Ташкент',
    //   rating: 4.8
    // }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

/**
 * Авторизация (логин)
 */
export async function exampleLogin() {
  try {
    const user = await userService.login('aziz@example.com', '$2a$10$YjNpbHNjcGlkbg==');
    console.log('Вход успешен:', user);
    // Сохраняем пользователя в localStorage
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Ошибка входа:', error);
  }
}

/**
 * Регистрация нового пользователя
 */
export async function exampleRegister() {
  try {
    const newUser = await userService.register({
      email: 'newuser@example.com',
      password: 'password123',
      name: 'Новый Пользователь',
      phone: '+998 90 000-00-00',
      address: 'Ташкент, Центр',
    });
    console.log('Регистрация успешна:', newUser);
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
  }
}

// ============================================
// 💬 СООБЩЕНИЯ (MESSAGES)
// ============================================

/**
 * Получить сообщения
 */
export async function exampleGetMessages() {
  try {
    // Все сообщения
    const allMessages = await messageService.getMessages();
    console.log('Все сообщения:', allMessages);

    // Сообщения для конкретного животного
    const petMessages = await messageService.getMessages({ petId: 1 });
    console.log('Сообщения для животного 1:', petMessages);

    // Сообщения между двумя пользователями
    const userMessages = await messageService.getMessages({
      senderId: 1,
      receiverId: 2,
    });
    console.log('Сообщения между пользователями:', userMessages);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

/**
 * Отправить сообщение
 */
export async function exampleSendMessage() {
  try {
    const message = await messageService.sendMessage({
      sender_id: 1,
      receiver_id: 2,
      pet_id: 2,
      content: 'Здравствуйте! Интересует ваша кошка Мурка. Есть ли она еще в наличии?',
    });
    console.log('Сообщение отправлено:', message);
    // {
    //   id: 4,
    //   sender_id: 1,
    //   receiver_id: 2,
    //   pet_id: 2,
    //   content: '...',
    //   created_at: '2025-12-07T10:30:00Z',
    //   read: false
    // }
  } catch (error) {
    console.error('Ошибка при отправке:', error);
  }
}

/**
 * Отметить сообщение как прочитанное
 */
export async function exampleMarkAsRead(messageId) {
  try {
    const updated = await messageService.markAsRead(messageId);
    console.log('Сообщение отмечено как прочитанное:', updated);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

// ============================================
// 🚨 ЖАЛОБЫ (REPORTS)
// ============================================

/**
 * Получить жалобы
 */
export async function exampleGetReports() {
  try {
    // Все жалобы
    const allReports = await reportService.getReports();
    console.log('Все жалобы:', allReports);

    // Только необработанные
    const pendingReports = await reportService.getReports('pending');
    console.log('Необработанные жалобы:', pendingReports);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

/**
 * Подать жалобу на животное/продавца
 */
export async function exampleCreateReport() {
  try {
    const report = await reportService.createReport({
      pet_id: 1,
      user_id: 2,
      reason: 'Мошенничество',
      description: 'Фото не соответствует действительности. Животное выглядит совсем не так.',
    });
    console.log('Жалоба создана:', report);
    // {
    //   id: 2,
    //   pet_id: 1,
    //   user_id: 2,
    //   reason: 'Мошенничество',
    //   description: '...',
    //   status: 'pending',
    //   created_at: '2025-12-07T14:20:00Z'
    // }
  } catch (error) {
    console.error('Ошибка при создании жалобы:', error);
  }
}

/**
 * Обновить статус жалобы (для админов)
 */
export async function exampleUpdateReportStatus(reportId) {
  try {
    const updated = await reportService.updateReportStatus(reportId, 'resolved');
    console.log('Статус жалобы обновлен:', updated);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

// ============================================
// 🏥 ПРИЮТЫ (SHELTERS)
// ============================================

/**
 * Получить все приюты
 */
export async function exampleGetAllShelters() {
  try {
    const shelters = await shelterService.getAllShelters();
    console.log('Все приюты:', shelters);
    // [{
    //   id: 1,
    //   name: "Приют 'Верные друзья'",
    //   type: 'Собаки',
    //   address: '...',
    //   phone: '+998 71 123-45-67',
    //   email: 'shelter1@example.com',
    //   website: 'www.vernie-druzya.uz',
    //   animals_count: 150,
    //   coordinates: { lat: 41.2995, lng: 69.2401 }
    // }, ...]
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

/**
 * Получить приют по ID
 */
export async function exampleGetShelterById(shelterId) {
  try {
    const shelter = await shelterService.getShelterById(shelterId);
    console.log('Приют:', shelter);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

// ============================================
// 🔗 КОМБИНИРОВАННЫЕ ПРИМЕРЫ
// ============================================

/**
 * Полный сценарий: Поиск животного и написание сообщения
 */
export async function exampleCompleteScenario() {
  try {
    // 1. Войти в аккаунт
    const user = await userService.login('aziz@example.com', '$2a$10$YjNpbHNjcGlkbg==');
    console.log('✅ Вход успешен:', user.name);

    // 2. Найти собак
    const dogs = await petService.getAllPets({ type: 'Собака' });
    console.log('✅ Найдено собак:', dogs.length);

    // 3. Получить информацию о первой собаке
    if (dogs.length > 0) {
      const firstDog = dogs[0];
      const owner = await userService.getUserById(firstDog.owner_id);
      console.log('✅ Животное:', firstDog.name);
      console.log('✅ Владелец:', owner.name);

      // 4. Написать сообщение владельцу
      const message = await messageService.sendMessage({
        sender_id: user.id,
        receiver_id: owner.id,
        pet_id: firstDog.id,
        content: `Привет, ${owner.name}! Интересует твой ${firstDog.name}. Можно ли встретиться?`,
      });
      console.log('✅ Сообщение отправлено');

      // 5. Получить все сообщения об этом животном
      const messages = await messageService.getMessages({ petId: firstDog.id });
      console.log('✅ Всего сообщений об этом животном:', messages.length);
    }
  } catch (error) {
    console.error('❌ Ошибка в сценарии:', error);
  }
}

/**
 * Пример администратора: Модерация объявлений
 */
export async function exampleAdminModeration() {
  try {
    // 1. Войти как администратор
    const admin = await userService.login('admin@example.com', '$2a$10$YWRtaW5wYXNz');
    console.log('✅ Admin login:', admin.name);

    // 2. Получить все необработанные объявления
    const pendingPets = await petService.getAllPets({ status: 'pending' });
    console.log('✅ Необработанные объявления:', pendingPets.length);

    // 3. Одобрить первое объявление
    if (pendingPets.length > 0) {
      const petToApprove = pendingPets[0];
      await petService.updatePet(petToApprove.id, { status: 'approved' });
      console.log('✅ Объявление одобрено:', petToApprove.name);
    }

    // 4. Получить все жалобы
    const reports = await reportService.getReports('pending');
    console.log('✅ Необработанные жалобы:', reports.length);

    // 5. Обработать первую жалобу
    if (reports.length > 0) {
      const reportToResolve = reports[0];
      await reportService.updateReportStatus(reportToResolve.id, 'resolved');
      console.log('✅ Жалоба обработана');
    }
  } catch (error) {
    console.error('❌ Ошибка в админ сценарии:', error);
  }
}

// ============================================
// 📊 СТАТИСТИКА И АНАЛИТИКА
// ============================================

/**
 * Получить статистику
 */
export async function exampleGetStatistics() {
  try {
    const [pets, users, messages, reports, shelters] = await Promise.all([
      petService.getAllPets(),
      userService.getAllUsers(),
      messageService.getMessages(),
      reportService.getReports(),
      shelterService.getAllShelters(),
    ]);

    const stats = {
      totalPets: pets.length,
      approvedPets: pets.filter((p) => p.status === 'approved').length,
      pendingPets: pets.filter((p) => p.status === 'pending').length,
      totalUsers: users.filter((u) => u.role === 'user').length,
      totalMessages: messages.length,
      totalReports: reports.length,
      resolvedReports: reports.filter((r) => r.status === 'resolved').length,
      totalShelters: shelters.length,
    };

    console.log('📊 Статистика:', stats);
    return stats;
  } catch (error) {
    console.error('Ошибка при получении статистики:', error);
  }
}

export default {
  exampleGetAllPets,
  exampleGetPetById,
  exampleCreatePet,
  exampleUpdatePet,
  exampleDeletePet,
  exampleGetAllUsers,
  exampleGetUserById,
  exampleLogin,
  exampleRegister,
  exampleGetMessages,
  exampleSendMessage,
  exampleMarkAsRead,
  exampleGetReports,
  exampleCreateReport,
  exampleUpdateReportStatus,
  exampleGetAllShelters,
  exampleGetShelterById,
  exampleCompleteScenario,
  exampleAdminModeration,
  exampleGetStatistics,
};
