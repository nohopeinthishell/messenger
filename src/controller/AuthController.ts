import { AuthAPI, type SignInData, type SignUpData } from "../api/AuthAPI";
import store from "../store/store";
import { router } from "../router/Router";

class AuthController {
  private api = new AuthAPI();

  async signIn(data: SignInData) {
    await this.api.signIn(data);
    await this.fetchUser();
    router.go("/messenger");
  }

  async signUp(data: SignUpData) {
    await this.api.signUp(data);
    await this.fetchUser();
    router.go("/messenger");
  }

  async fetchUser() {
    const user = await this.api.getUser();
    store.setState("user", user);

    return user;
  }

  async logOut() {
    try {
      await this.api.logOut();
    } catch {
      // если cookie уже невалидная, всё равно считаем пользователя разлогиненным
    }

    store.setState("user", null);
    router.go("/");
  }
}

export const authController = new AuthController();
