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
import ToastContainer from "./components/ToastContainer";
import { handleError } from "./services/toast";

registerComponents();

export default class App {
  private toastContainer = new ToastContainer();

  render(): void {
    this.mountToastContainer();
    void this.init();
  }

  private init = async () => {
    await this.isAuthenticated();
    this.initRouter();
    this.attachEventListners();
  };

  private mountToastContainer = () => {
    const container = this.toastContainer.element();

    if (container && !document.body.contains(container)) {
      document.body.append(container);
    }
  };

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
    window.addEventListener("error", (event) => {
      handleError(event.error ?? event.message);
    });

    window.addEventListener("unhandledrejection", (event) => {
      event.preventDefault();
      handleError(event.reason);
    });

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
