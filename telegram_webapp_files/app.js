// Инициализация Telegram WebApp
let tg = window.Telegram.WebApp;

// Расширяем на весь экран
tg.expand();

// Сообщаем Telegram, что приложение готово
tg.ready();

// Устанавливаем цвета в соответствии с темой Telegram
document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#ffffff');
document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#000000');
document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#40a7e3');
document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff');

// Данные пользователя
const userProfile = {
  name: 'Пользователь',
  photo: null,
  zodiacSign: 'Овен',
  numerologyNumber: 7,
  birthday: '01.01.1990'
};

// Данные продаж
const sales = [
  { id: 1, date: '15.05.2025', product: 'Страхование жизни', amount: 15000, epkId: '123456' },
  { id: 2, date: '16.05.2025', product: 'Инвестиционный продукт', amount: 50000, epkId: '789012' },
  { id: 3, date: '18.05.2025', product: 'Пенсионная программа', amount: 30000, epkId: '345678' }
];

// Данные уведомлений
const notifications = [
  {
    id: 1,
    date: '20.05.2025',
    title: 'Полнолуние в Скорпионе',
    message: 'Завтра полнолуние в Скорпионе. Благоприятное время для завершения сложных проектов и принятия важных решений.',
    isRead: false
  },
  {
    id: 2,
    date: '25.05.2025',
    title: 'Меркурий входит в Близнецы',
    message: 'Через 5 дней Меркурий войдет в знак Близнецов. Это отличное время для коммуникаций, переговоров и заключения сделок.',
    isRead: true
  },
  {
    id: 3,
    date: '19.05.2025',
    title: 'Персональное напоминание',
    message: 'Сегодня благоприятный день для работы с постоянными клиентами. Ваша интуиция поможет найти правильный подход.',
    isRead: false
  }
];

// Получение элементов DOM
const contentElement = document.getElementById('content');
const profileBtn = document.getElementById('profile-btn');
const performanceBtn = document.getElementById('performance-btn');
const salesBtn = document.getElementById('sales-btn');
const horoscopeBtn = document.getElementById('horoscope-btn');
const notificationsBtn = document.getElementById('notifications-btn');

// Функция для отображения профиля
function showProfile() {
  // Получаем символ знака зодиака
  const zodiacSymbol = getZodiacSymbol(userProfile.zodiacSign);
  
  // Получаем сильные стороны на основе знака зодиака
  const strengths = getZodiacStrengths(userProfile.zodiacSign);
  
  // Формируем HTML для профиля
  const html = `
    <div class="section profile-section">
      <div class="profile-header">
        <div class="profile-photo">
          ${userProfile.photo ? `<img src="${userProfile.photo}" alt="Фото профиля">` : `<div class="profile-photo-placeholder">${userProfile.name.charAt(0)}</div>`}
        </div>
        <div class="profile-info">
          <h2>${userProfile.name}</h2>
          <p>Дата рождения: ${userProfile.birthday}</p>
          <p>Знак зодиака: ${zodiacSymbol} ${userProfile.zodiacSign}</p>
          <p>Число нумерологии: ${userProfile.numerologyNumber}</p>
        </div>
      </div>
      
      <div class="profile-strengths">
        <h3>Ваши сильные стороны:</h3>
        <ul>
          ${strengths.map(strength => `<li>${strength}</li>`).join('')}
        </ul>
      </div>
      
      <button class="primary-button" id="update-photo-btn">Обновить фото профиля</button>
    </div>
  `;
  
  // Отображаем HTML
  contentElement.innerHTML = html;
  
  // Добавляем обработчик для кнопки обновления фото
  document.getElementById('update-photo-btn').addEventListener('click', () => {
    alert('Функция обновления фото будет доступна в следующей версии');
  });
  
  // Обновляем активную кнопку в навигации
  setActiveButton(profileBtn);
}

// Функция для отображения расчета результативности
function showPerformance() {
  const html = `
    <div class="section performance-section">
      <h2>Расчет результативности и премии</h2>
      
      <div class="input-group">
        <label>Фактическое количество УП:</label>
        <input type="number" id="up-fact" value="0">
      </div>
      
      <div class="input-group">
        <label>План по УП:</label>
        <input type="number" id="up-plan" value="0">
      </div>
      
      <div class="input-group">
        <label>Фактическое количество КД:</label>
        <input type="number" id="kd-fact" value="0">
      </div>
      
      <div class="input-group">
        <label>План по КД:</label>
        <input type="number" id="kd-plan" value="0">
      </div>
      
      <div class="input-group">
        <label>Фактический SIS:</label>
        <input type="number" id="sis-fact" value="0">
      </div>
      
      <div class="input-group">
        <label>План по SIS:</label>
        <input type="number" id="sis-plan" value="0">
      </div>
      
      <div class="input-group">
        <label>Фактический АУМ:</label>
        <input type="number" id="aum-fact" value="0">
      </div>
      
      <div class="input-group">
        <label>План по АУМ:</label>
        <input type="number" id="aum-plan" value="0">
      </div>
      
      <div class="input-group">
        <label>Коэффициент отработанного времени (0-1):</label>
        <input type="number" id="time-coef" min="0" max="1" step="0.01" value="1">
      </div>
      
      <button class="primary-button" id="calculate-btn">Рассчитать</button>
      
      <div id="result-container" style="display: none;" class="result-container">
        <h3>Результаты расчета:</h3>
        <p>Крез = <span id="krez-result">0</span></p>
        <p>Премия = <span id="premium-result">0</span> руб.</p>
      </div>
    </div>
  `;
  
  contentElement.innerHTML = html;
  
  // Добавляем обработчик для кнопки расчета
  document.getElementById('calculate-btn').addEventListener('click', calculatePerformance);
  
  setActiveButton(performanceBtn);
}

// Функция для отображения продаж
function showSales() {
  const html = `
    <div class="section sales-section">
      <h2>Мои продажи</h2>
      
      <button class="primary-button" id="add-sale-btn">Добавить новую сделку</button>
      
      <div id="sale-form" style="display: none;" class="sale-form">
        <h3>Новая сделка</h3>
        
        <div class="input-group">
          <label>Продукт:</label>
          <input type="text" id="product-input" placeholder="Название продукта">
        </div>
        
        <div class="input-group">
          <label>Сумма (руб.):</label>
          <input type="text" id="amount-input" placeholder="Сумма сделки">
        </div>
        
        <div class="input-group">
          <label>EPK_ID клиента:</label>
          <input type="text" id="epk-input" placeholder="Только цифры">
        </div>
        
        <div class="button-group">
          <button class="primary-button" id="save-sale-btn">Сохранить</button>
          <button class="secondary-button" id="cancel-sale-btn">Отмена</button>
        </div>
      </div>
      
      <div class="sales-list">
        <h3>История сделок</h3>
        <div id="sales-container">
          ${sales.length === 0 ? 
            '<p>У вас пока нет сохраненных сделок</p>' : 
            sales.map(sale => `
              <div class="sale-item">
                <div class="sale-header">
                  <span class="sale-date">${sale.date}</span>
                  <span class="sale-amount">${sale.amount.toLocaleString()} руб.</span>
                </div>
                <div class="sale-details">
                  <p><strong>Продукт:</strong> ${sale.product}</p>
                  <p><strong>EPK_ID:</strong> ${sale.epkId}</p>
                </div>
              </div>
            `).join('')
          }
        </div>
      </div>
    </div>
  `;
  
  contentElement.innerHTML = html;
  
  // Добавляем обработчики для кнопок
  document.getElementById('add-sale-btn').addEventListener('click', () => {
    document.getElementById('sale-form').style.display = 'block';
    document.getElementById('add-sale-btn').style.display = 'none';
  });
  
  document.getElementById('cancel-sale-btn').addEventListener('click', () => {
    document.getElementById('sale-form').style.display = 'none';
    document.getElementById('add-sale-btn').style.display = 'block';
  });
  
  document.getElementById('save-sale-btn').addEventListener('click', addNewSale);
  
  setActiveButton(salesBtn);
}

// Функция для отображения гороскопа
function showHoroscope() {
  // Получаем гороскоп для знака зодиака пользователя
  const horoscope = getDailyHoroscope(userProfile.zodiacSign);
  
  // Получаем рекомендации по работе
  const recommendations = getWorkRecommendations(userProfile.zodiacSign);
  
  // Получаем символ знака зодиака
  const zodiacSymbol = getZodiacSymbol(userProfile.zodiacSign);
  
  const html = `
    <div class="section horoscope-section">
      <h2>Астрологический прогноз дня</h2>
      
      <div class="zodiac-sign">
        <div class="zodiac-icon">
          ${zodiacSymbol}
        </div>
        <h3>${userProfile.zodiacSign}</h3>
      </div>
      
      <div class="horoscope-content">
        <p>${horoscope}</p>
      </div>
      
      <div class="horoscope-recommendations">
        <h3>Рекомендации по работе:</h3>
        <ul>
          ${recommendations.map(recommendation => `<li>${recommendation}</li>`).join('')}
        </ul>
      </div>
      
      <div class="astro-events">
        <h3>Важные астрологические события:</h3>
        <div class="event-item">
          <span class="event-date">21.05.2025</span>
          <span class="event-description">Полнолуние в Скорпионе</span>
        </div>
        <div class="event-item">
          <span class="event-date">25.05.2025</span>
          <span class="event-description">Меркурий входит в Близнецы</span>
        </div>
      </div>
    </div>
  `;
  
  contentElement.innerHTML = html;
  
  setActiveButton(horoscopeBtn);
}

// Функция для отображения уведомлений
function showNotifications() {
  const html = `
    <div class="section notifications-section">
      <h2>Астрологические напоминания</h2>
      
      ${notifications.length === 0 ? 
        '<p class="empty-state">У вас нет новых напоминаний</p>' : 
        `<div class="notifications-list">
          ${notifications.map(notification => `
            <div class="notification-item ${notification.isRead ? 'read' : 'unread'}" data-id="${notification.id}">
              <div class="notification-header">
                <span class="notification-date">${notification.date}</span>
                <span class="notification-status">
                  ${!notification.isRead ? '<span class="unread-badge">Новое</span>' : ''}
                </span>
              </div>
              <h3 class="notification-title">${notification.title}</h3>
              <p class="notification-message">${notification.message}</p>
              <div class="notification-actions">
                <button class="secondary-button small delete-notification-btn" data-id="${notification.id}">Удалить</button>
              </div>
            </div>
          `).join('')}
        </div>`
      }
    </div>
  `;
  
  contentElement.innerHTML = html;
  
  // Добавляем обработчики для уведомлений
  document.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      markNotificationAsRead(id);
    });
  });
  
  document.querySelectorAll('.delete-notification-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const id = parseInt(this.getAttribute('data-id'));
      deleteNotification(id);
    });
  });
  
  setActiveButton(notificationsBtn);
}

// Вспомогательные функции

// Расчет результативности и премии
function calculatePerformance() {
  const upFact = parseFloat(document.getElementById('up-fact').value) || 0;
  const upPlan = parseFloat(document.getElementById('up-plan').value) || 0;
  const kdFact = parseFloat(document.getElementById('kd-fact').value) || 0;
  const kdPlan = parseFloat(document.getElementById('kd-plan').value) || 0;
  const sisFact = parseFloat(document.getElementById('sis-fact').value) || 0;
  const sisPlan = parseFloat(document.getElementById('sis-plan').value) || 0;
  const aumFact = parseFloat(document.getElementById('aum-fact').value) || 0;
  const aumPlan = parseFloat(document.getElementById('aum-plan').value) || 0;
  const timeCoef = parseFloat(document.getElementById('time-coef').value) || 0;
  
  const upRatio = upPlan > 0 ? upFact / upPlan : 0;
  const kdRatio = kdPlan > 0 ? kdFact / kdPlan : 0;
  const sisRatio = sisPlan > 0 ? sisFact / sisPlan : 0;
  const aumRatio = aumPlan > 0 ? aumFact / aumPlan : 0;
  
  const krez = (upRatio * 0.30 + kdRatio * 0.20 + sisRatio * 0.10 + aumRatio * 0.40) * timeCoef;
  const premium = 92400 * 0.33 * krez;
  
  document.getElementById('krez-result').textContent = krez.toFixed(2);
  document.getElementById('premium-result').textContent = premium.toFixed(2);
  document.getElementById('result-container').style.display = 'block';
  
  // Отправляем данные в Telegram
  tg.sendData(JSON.stringify({
    action: 'calculate_performance',
    performance: {
      upFact, upPlan, kdFact, kdPlan, sisFact, sisPlan, aumFact, aumPlan, timeCoef, krez, premium
    }
  }));
}

// Добавление новой продажи
function addNewSale() {
  const product = document.getElementById('product-input').value;
  const amount = document.getElementById('amount-input').value;
  const epkId = document.getElementById('epk-input').value;
  
  if (!product || !amount || !epkId) {
    alert('Пожалуйста, заполните все поля');
    return;
  }
  
  if (!/^\d+$/.test(epkId)) {
    alert('EPK_ID должен содержать только цифры');
    return;
  }
  
  const amountValue = parseFloat(amount);
  if (isNaN(amountValue) || amountValue <= 0) {
    alert('Сумма должна быть положительным числом');
    return;
  }
  
  const newSale = {
    id: sales.length + 1,
    date: new Date().toLocaleDateString('ru-RU'),
    product: product,
    amount: amountValue,
    epkId: epkId
  };
  
  sales.push(newSale);
  
  // Отправляем данные в Telegram
  tg.sendData(JSON.stringify({
    action: 'add_sale',
    sale: newSale
  }));
  
  // Обновляем отображение
  showSales();
}

// Отметка уведомления как прочитанного
function markNotificationAsRead(id) {
  const notification = notifications.find(n => n.id === id);
  if (notification && !notification.isRead) {
    notification.isRead = true;
    showNotifications();
  }
}

// Удаление уведомления
function deleteNotification(id) {
  const index = notifications.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications.splice(index, 1);
    showNotifications();
  }
}

// Получение символа знака зодиака
function getZodiacSymbol(sign) {
  const symbols = {
    "Овен": "♈",
    "Телец": "♉",
    "Близнецы": "♊",
    "Рак": "♋",
    "Лев": "♌",
    "Дева": "♍",
    "Весы": "♎",
    "Скорпион": "♏",
    "Стрелец": "♐",
    "Козерог": "♑",
    "Водолей": "♒",
    "Рыбы": "♓"
  };
  
  return symbols[sign] || "✨";
}

// Получение гороскопа по знаку зодиака
function getDailyHoroscope(sign) {
  const horoscopes = {
    "Овен": [
      "Сегодня ваша энергия на пике! Отличный день для активных продаж и инициативы в работе. Фокусируйтесь на новых клиентах и не бойтесь проявлять настойчивость.",
      "День благоприятен для командной работы. Ваш энтузиазм будет заразителен и поможет мотивировать коллег. Обратите внимание на возможности для быстрых продаж.",
      "Сегодня лучше сосредоточиться на планировании, чем на активных действиях. Используйте свою энергию для стратегического мышления и подготовки к будущим сделкам."
    ],
    "Телец": [
      "Сегодня ваша природная надежность особенно ценна. Фокусируйтесь на укреплении отношений с существующими клиентами. Терпение принесет финансовые результаты.",
      "Благоприятный день для работы с документацией и финансовыми аспектами сделок. Ваше внимание к деталям поможет избежать ошибок и укрепить доверие клиентов.",
      "Сегодня стоит проявить гибкость в подходах к работе. Попробуйте новые методы взаимодействия с клиентами, это может привести к неожиданно позитивным результатам."
    ],
    "Близнецы": [
      "Ваши коммуникативные навыки сегодня на высоте! Идеальный день для презентаций, переговоров и налаживания новых контактов. Используйте свое красноречие.",
      "День благоприятен для многозадачности. Вы сможете эффективно жонглировать несколькими проектами одновременно. Обратите внимание на возможности для кросс-продаж.",
      "Сегодня лучше сосредоточиться на одной задаче вместо распыления внимания. Глубокое погружение в один проект принесет лучшие результаты, чем поверхностная работа над многими."
    ]
  };
  
  // Для других знаков зодиака используем общий гороскоп
  const defaultHoroscope = "Сегодня благоприятный день для профессиональных достижений. Ваши природные таланты помогут вам преуспеть в работе с клиентами и достичь поставленных целей.";
  
  const signHoroscopes = horoscopes[sign];
  if (signHoroscopes && signHoroscopes.length > 0) {
    // Выбираем случайный гороскоп из доступных для этого знака
    const randomIndex = Math.floor(Math.random() * signHoroscopes.length);
    return signHoroscopes[randomIndex];
  }
  
  return defaultHoroscope;
}

// Получение рекомендаций по работе
function getWorkRecommendations(sign) {
  const recommendations = {
    "Овен": [
      "Фокусируйтесь на новых клиентах",
      "Проявляйте инициативу в переговорах",
      "Используйте свою энергию для достижения целей"
    ],
    "Телец": [
      "Укрепляйте отношения с существующими клиентами",
      "Уделите внимание финансовым деталям сделок",
      "Проявляйте терпение в длительных переговорах"
    ],
    "Близнецы": [
      "Используйте свои коммуникативные навыки",
      "Обратите внимание на возможности для кросс-продаж",
      "Делитесь информацией с коллегами"
    ]
  };
  
  // Для других знаков зодиака используем общие рекомендации
  const defaultRecommendations = [
    "Фокусируйтесь на своих сильных сторонах",
    "Планируйте свой день заранее",
    "Уделите время саморазвитию"
  ];
  
  return recommendations[sign] || defaultRecommendations;
}

// Получение сильных сторон на основе знака зодиака
function getZodiacStrengths(sign) {
  const strengths = {
    "Овен": [
      "Лидерские качества",
      "Энергичность и инициативность",
      "Умение быстро принимать решения",
      "Целеустремленность"
    ],
    "Телец": [
      "Надежность и стабильность",
      "Внимание к деталям",
      "Терпение и настойчивость",
      "Практичность"
    ],
    "Близнецы": [
      "Коммуникабельность",
      "Адаптивность",
      "Быстрое мышление",
      "Многозадачность"
    ]
  };
  
  // Для других знаков зодиака используем общие сильные стороны
  const defaultStrengths = [
    "Профессионализм",
    "Умение работать с клиентами",
    "Аналитическое мышление",
    "Стрессоустойчивость"
  ];
  
  return strengths[sign] || defaultStrengths;
}

// Установка активной кнопки в навигации
function setActiveButton(button) {
  // Сбрасываем активное состояние у всех кнопок
  [profileBtn, performanceBtn, salesBtn, horoscopeBtn, notificationsBtn].forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Устанавливаем активное состояние у выбранной кнопки
  button.classList.add('active');
}

// Добавляем обработчики событий для кнопок навигации
profileBtn.addEventListener('click', showProfile);
performanceBtn.addEventListener('click', showPerformance);
salesBtn.addEventListener('click', showSales);
horoscopeBtn.addEventListener('click', showHoroscope);
notificationsBtn.addEventListener('click', showNotifications);

// Инициализация: показываем профиль при загрузке
showProfile();
