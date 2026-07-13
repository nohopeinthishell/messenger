import { BaseAPI } from "../framework/BaseAPI";
import HTTPTransport from "../framework/HTTPTransport";

export type UpdateProfileData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar?: string;
};

export type UpdatePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export class UserAPI extends BaseAPI {
  private http = new HTTPTransport();

  updateProfile(data: UpdateProfileData) {
    return this.http.put("https://ya-praktikum.tech/api/v2/user/profile", {
      data,
    });
  }

  updatePassword(data: UpdatePasswordData) {
    return this.http.put("https://ya-praktikum.tech/api/v2/user/password", {
      data,
    });
  }
  
  updateAvatar(data: FormData) {
    return this.http.put(
      "https://ya-praktikum.tech/api/v2/user/profile/avatar",
      {
        data,
      },
    );
  }
}
