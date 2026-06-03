import Handlebars from "handlebars";

import { NotFound } from "./pages/NotFound";
import { Auth } from "./pages/Auth";
import { Registration } from "./pages/Registration";


import { LinkUI } from "./ui/LinkUI";
import { InputUI } from "./ui/InputUI";
import { ButtonUI } from "./ui/ButtonUI";
import { ServerError } from "./pages/ServerError";
import { Card } from "./components/Card";

Handlebars.registerPartial("LinkUI", LinkUI);
Handlebars.registerPartial("InputUI", InputUI);
Handlebars.registerPartial("ButtonUI", ButtonUI);
Handlebars.registerPartial("Card", Card);

type AppState = {
  currentPage: string;
};

export default class App {
  state: AppState;
  appElement: HTMLElement;

  constructor() {
    this.state = {
      currentPage: "auth",
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
      case "server-error":
        template = Handlebars.compile(ServerError);
        break;
      default:
        template = Handlebars.compile(Auth);
    }

    this.appElement.innerHTML = template({
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
          type: "button",
          action: "login",
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
            error: "123123"
          },
        ],
        button: {
          text: "Зарегистрироваться",
          type: "button",
          action: "reg",
        },
        links: [
          {
            href: "#",
            page: "auth",
            text: "Войти",
          },
        ],
      },
    });
    this.attachEventListners();
  }

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
  };

  handleButtonClick = (e: Event) => {
    const target = e.target as HTMLElement;
    console.log("Button clicked:", target.dataset.action);
  };

  changePage = (page: string) => {
    this.state.currentPage = page;
    this.render();
  };
}
