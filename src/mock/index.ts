export const authCard = {
  title: "Вход",
  inputs: [
    {
      label: "Логин",
      type: "text",
      name: "login",
      placeholder: "Логин",
    },
    {
      label: "Пароль",
      type: "password",
      name: "password",
      placeholder: "Пароль",
    },
  ],
  button: {
    text: "Авторизоваться",
    type: "submit",
    action: "login",
    page: "chats",
  },
  links: [
    {
      href: "#",
      page: "registration",
      text: "Нет аккаунта?",
    },
  ],
};

export const regCard = {
  title: "Регистрация",
  inputs: [
    {
      label: "Почта",
      type: "email",
      name: "email",
      placeholder: "Почта",
    },
    {
      label: "Логин",
      type: "text",
      name: "login",
      placeholder: "Логин",
    },
    {
      label: "Имя",
      type: "text",
      name: "first_name",
      placeholder: "Имя",
    },
    {
      label: "Фамилия",
      type: "text",
      name: "second_name",
      placeholder: "Фамилия",
    },
    {
      label: "Телефон",
      type: "tel",
      name: "phone",
      placeholder: "Телефон",
    },
    {
      label: "Пароль",
      type: "password",
      name: "password",
      placeholder: "Пароль",
    },
    {
      label: "Пароль (ещё раз)",
      type: "password",
      name: "password_repeat",
      placeholder: "Пароль (ещё раз)",
    },
  ],
  button: {
    text: "Зарегистрироваться",
    type: "submit",
    action: "reg",
    page: "auth",
  },
  links: [
    {
      href: "#",
      page: "auth",
      text: "Войти",
    },
  ],
};

export const profile = {
  displayName: "Иван",
  fields: [
    {
      label: "Почта",
      value: "pochta@yandex.ru",
    },
    {
      label: "Логин",
      value: "ivanivanov",
    },
    {
      label: "Имя",
      value: "Иван",
    },
    {
      label: "Фамилия",
      value: "Иванов",
    },
    {
      label: "Имя в чате",
      value: "Иван",
    },
    {
      label: "Телефон",
      value: "+7 (909) 967 30 30",
    },
  ],
};

export const profilePassword = {
  fields: [
    {
      label: "Старый пароль",
      name: "oldPassword",
      type: "password",
      value: "password",
    },
    {
      label: "Новый пароль",
      name: "newPassword",
      type: "password",
      value: "newpassword",
    },
    {
      label: "Повторите новый пароль",
      name: "newPasswordRepeat",
      type: "password",
      value: "newpassword",
    },
  ],
  button: {
    text: "Сохранить",
    type: "submit",
    action: "save-password",
    page: "profile",
    class: "profile__save",
  },
};

export const profileEdit = {
  fields: [
    {
      label: "Почта",
      name: "email",
      type: "email",
      value: "pochta@yandex.ru",
    },
    {
      label: "Логин",
      name: "login",
      type: "text",
      value: "ivanivanov",
    },
    {
      label: "Имя",
      name: "first_name",
      type: "text",
      value: "Иван",
    },
    {
      label: "Фамилия",
      name: "second_name",
      type: "text",
      value: "Иванов",
    },
    {
      label: "Имя в чате",
      name: "display_name",
      type: "text",
      value: "Иван",
    },
    {
      label: "Телефон",
      name: "phone",
      type: "tel",
      value: "+79099673030",
    },
  ],
  button: {
    text: "Сохранить",
    type: "submit",
    action: "save-profile",
    page: "profile",
    class: "profile__save",
  },
};

export const chatPage = {
  chats: [
    {
      name: "Андрей",
      lastMessage: "Изображение",
      time: "10:49",
      active: true,
    },
    {
      name: "Киноклуб",
      lastMessage: "Стикер",
      time: "12:00",
    },
    {
      name: "Илья",
      lastMessage: "Друзья, у меня для вас особенный выпуск новостей...",
      time: "15:12",
    },
  ],
  selectedChat: {
    name: "Андрей",
  },

  messages: [
    {
      text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
      time: "11:56",
    },
    {
      text: "Отлично, добавлю это в прототип.",
      time: "12:00",
      own: true,
    },
  ],
  messageForm: {
    input: {
      type: "text",
      name: "message",
      placeholder: "Сообщение",
      class: "chat__message-field",
    },
    button: {
      text: "→",
      type: "submit",
      class: "chat__send",
      ariaLabel: "Отправить",
    },
  },
};
