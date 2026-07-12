import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import Chat from "./pages/Chat";

import { authCard, regCard, chatPage, profilePassword } from "./mock";
import ServerError from "./pages/ServerError";

import Profile from "./pages/Profile";
import ProfilePassword from "./pages/ProfilePassword";
import ProfileEdit from "./pages/ProfileEdit";
import { registerComponents } from "./framework/RegisterComponent";
import { router } from "./router/Router";
import { authController } from "./controller/AuthController";
import store from "./store/store";

registerComponents();

export default class App {
  render(): void {
    void this.init();
  }

  private init = async () => {
    await this.isAuthenticated();
    this.initRouter();
    this.attachEventListners();
  }

  initRouter = () => {
    router
      .use("/", Auth, { authCard }, "guestOnly")
      .use("/404", NotFound)
      .use("/500", ServerError)
      .use("/messenger", Chat, chatPage, "private")
      .use("/settings", Profile, undefined, "private")
      .use("/profile-edit", ProfileEdit, undefined, "private")
      .use("/profile-password", ProfilePassword, profilePassword, "private")
      .use("/sign-up", Registration, { regCard }, "guestOnly")
      .start();
  };

  isAuthenticated = async () => {
    try {
      await authController.fetchUser();
    } catch {
      store.setState("user", null);
    }
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
    });
  };
}
