import Handlebars from "handlebars";

import { NotFound } from "./pages/NotFound";
import { Auth } from "./pages/Auth";
import { Registration } from "./pages/Registration";
import { Chat } from "./pages/Chat";

import { LinkUI } from "./ui/LinkUI";
import { InputUI } from "./ui/InputUI";
import { ButtonUI } from "./ui/ButtonUI";
import { ServerError } from "./pages/ServerError";
import { Card } from "./components/Card";
import { Profile } from "./pages/Profile";
import { ProfileEdit } from "./pages/ProfileEdit";
import { ProfilePassword } from "./pages/ProfilePassword";
import { Avatar } from "./components/Avatar";

Handlebars.registerPartial("LinkUI", LinkUI);
Handlebars.registerPartial("InputUI", InputUI);
Handlebars.registerPartial("ButtonUI", ButtonUI);
Handlebars.registerPartial("Card", Card);
Handlebars.registerPartial("Avatar", Avatar);

type AppState = {
  currentPage: string;
};

export default class App {
  state: AppState;
  appElement: HTMLElement;

  constructor() {
    this.state = {
      currentPage: "",
    };
    const appElement = document.getElementById("app");

    if (!appElement) {
      throw new Error("Element #app not found");
    }

    this.appElement = appElement;
  }

  render(): void {
    let template: Handlebars.TemplateDelegate;

    switch (this.state.currentPage) {
      case "not-found":
        template = Handlebars.compile(NotFound);
        break;
      case "auth":
        template = Handlebars.compile(Auth);
        break;
      case "registration":
        template = Handlebars.compile(Registration);
        break;
      case "chats":
        template = Handlebars.compile(Chat);
        break;
      case "profile":
        template = Handlebars.compile(Profile);
        break;
      case "profile-edit":
        template = Handlebars.compile(ProfileEdit);
        break;
      case "profile-password":
        template = Handlebars.compile(ProfilePassword);
        break;
      case "server-error":
        template = Handlebars.compile(ServerError);
        break;
      default:
        template = Handlebars.compile(Auth);
    }

    this.renderTemplate(template, {
      authCard: {
        title: "Вход",
        inputs: [
          {
            label: "Логин",
            type: "text",
            name: "login",
            value: "ivanivanov",
            placeholder: "Логин",
          },
          {
            label: "Пароль",
            type: "password",
            name: "password",
            value: "password123",
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
      },
      regCard: {
        title: "Регистрация",
        inputs: [
          {
            label: "Почта",
            type: "email",
            name: "email",
            value: "pochta@yandex.ru",
            placeholder: "Почта",
          },
          {
            label: "Логин",
            type: "text",
            name: "login",
            value: "ivanivanov",
            placeholder: "Логин",
          },
          {
            label: "Имя",
            type: "text",
            name: "first_name",
            value: "Иван",
            placeholder: "Имя",
          },
          {
            label: "Фамилия",
            type: "text",
            name: "second_name",
            value: "Иванов",
            placeholder: "Фамилия",
          },
          {
            label: "Телефон",
            type: "tel",
            name: "phone",
            value: "+7 (909) 967 30 30",
            placeholder: "Телефон",
          },
          {
            label: "Пароль",
            type: "password",
            name: "password",
            value: "password123",
            placeholder: "Пароль",
          },
          {
            label: "Пароль (ещё раз)",
            type: "password",
            name: "password_repeat",
            value: "password1234",
            placeholder: "Пароль (ещё раз)",
            error: "123123",
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
      },
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
      profile: {
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
      },
      profileEdit: {
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
            value: "+7 (909) 967 30 30",
          },
        ],
      },
      profilePassword: {
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
    });
    this.attachEventListners();
  }

  renderTemplate = (template: Handlebars.TemplateDelegate, context: object) => {
    const parser = new DOMParser();
    const documentFragment = parser.parseFromString(template(context), "text/html");

    this.appElement.replaceChildren(...documentFragment.body.children);
  };

  attachEventListners = () => {
    const links = document.querySelectorAll(".link-ui");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const page = target.dataset.page;

        if (page) {
          this.changePage(page);
        }
      });
    });

    const buttons = document.querySelectorAll(".button-ui");
    buttons.forEach((button) => {
      button.addEventListener("click", this.handleButtonClick);
    });

    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Form submit:", new FormData(form));
      });
    });
  };

  handleButtonClick = (e: Event) => {
    const target = e.target as HTMLElement;
    console.log("Button clicked:", target.dataset.action);

    const page = target.dataset.page;

    if (page) {
      this.changePage(page);
    }
  };

  changePage = (page: string) => {
    this.state.currentPage = page;
    this.render();
  };
}
