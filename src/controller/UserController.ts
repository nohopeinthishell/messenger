import {
  UserAPI,
  type UpdatePasswordData,
  type UpdateProfileData,
} from "../api/UserAPI";
import store from "../store/store";
import { router } from "../router/Router";

class UserController {
  private api = new UserAPI();

  async updateProfile(data: UpdateProfileData) {
    const user = await this.api.updateProfile(data);

    store.setState("user", user);
    router.go("/settings");
  }

  async updatePassword(data: UpdatePasswordData) {
    await this.api.updatePassword(data);

    router.go("/settings");
  }

  async updateAvatar(data: FormData) {
    await this.api.updateAvatar(data);
  }
}

export const userController = new UserController();
