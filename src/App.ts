import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import Chat from "./pages/Chat";

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
import Router from "./router/Router";

registerComponents();

const router = new Router("#app");

export default class App {
  render(): void {
    this.initRouter();
    this.attachEventListners();
  }

  initRouter = () => {
    router
      .use("/", Auth, { authCard })
      .use("/404", NotFound)
      .use("/500", ServerError)
      .use("/messenger", Chat, chatPage)
      .use("/settings", Profile, profile)
      .use("/profile-edit", ProfileEdit, profileEdit)
      .use("/profile-password", ProfilePassword, profilePassword)
      .use("/sign-up", Registration, { regCard })
      .start();
  };

  attachEventListners = () => {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link) {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href) {
          router.go(href);
        }
      }

      const button = target.closest("button");
      const page = button?.getAttribute("page");

      if (page) {
        router.go(page);
      }
    });
  };
}
