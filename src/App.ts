import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import Chat from "./pages/Chat";

import Block from "./framework/Block";

import {
  authCard,
  regCard,
  profile,
  chatPage,
  profilePassword,
  profileEdit,
} from "./mock";
import ServerError from "./pages/ServerError";

import Profile from "./pages/Profile";
import ProfilePassword from "./pages/ProfilePassword";
import ProfileEdit from "./pages/ProfileEdit";
import { registerComponents } from "./framework/RegisterComponent";

registerComponents();

type AppState = {
  currentPage: string;
};

export default class App {
  state: AppState;
  appElement: HTMLElement;

  constructor() {
    this.state = {
      currentPage: "chats",
    };
    const appElement = document.getElementById("app");

    if (!appElement) {
      throw new Error("Element #app not found");
    }

    this.appElement = appElement;
  }

  render(): void {
    switch (this.state.currentPage) {
      case "not-found":
        this.renderBlock(new NotFound());
        break;
      case "auth":
        this.renderBlock(new Auth({ authCard }));
        break;
      case "registration":
        this.renderBlock(new Registration({ regCard }));
        break;
      case "chats":
        this.renderBlock(new Chat(chatPage));
        break;
      case "profile":
        this.renderBlock(new Profile(profile));
        break;
      case "profile-edit":
        this.renderBlock(new ProfileEdit(profileEdit));
        break;
      case "profile-password":
        this.renderBlock(new ProfilePassword(profilePassword));
        break;
      case "server-error":
        this.renderBlock(new ServerError());
        break;
      default:
        this.renderBlock(new Auth({ authCard }));
        break;
    }

    this.attachEventListners();
  }

  renderBlock = (page: Block) => {
    const pageElement = page.element();

    if (!pageElement) {
      throw new Error("Page element is not created");
    }

    this.appElement.replaceChildren(pageElement);
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

    // const buttons = document.querySelectorAll(".button-ui");
    // buttons.forEach((button) => {
    //   button.addEventListener("click", this.handleButtonClick);
    // });
  };

  // handleButtonClick = (e: Event) => {
  //   const target = e.target as HTMLElement;
  //   console.log("Button clicked:", target.dataset.action);

  //   const page = target.dataset.page;

  //   console.log(page);

  //   if (page) {
  //     this.changePage(page);
  //   }
  // };

  changePage = (page: string) => {
    this.state.currentPage = page;
    this.render();
  };
}
