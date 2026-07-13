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
    page: "/messenger",
  },
  links: [
    {
      href: "/sign-up",
      text: "Нет аккаунта?",
    },
  ],
  formType: "signin" as const,
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
    page: "/",
  },
  links: [
    {
      href: "/",
      text: "Войти",
    },
  ],

  formType: "signup" as const,
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
    },
    {
      label: "Новый пароль",
      name: "newPassword",
      type: "password",
    },
    {
      label: "Повторите новый пароль",
      name: "newPasswordRepeat",
      type: "password",
    },
  ],
  button: {
    text: "Сохранить",
    type: "submit",
    action: "save-password",
    page: "/settings",
    class: "profile__save",
  },
};

export const chatPage = {
  chats: [],
  selectedChat: null,
  messages: [],

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
