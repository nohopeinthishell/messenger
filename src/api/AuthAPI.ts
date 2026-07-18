import { BaseAPI } from "../framework/BaseAPI";
import HTTPTransport from "../framework/HTTPTransport";

export type SignUpData = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
};

export type SignInData = {
  login: string;
  password: string;
};

export class AuthAPI extends BaseAPI {
  private http = new HTTPTransport();

  signUp(data: SignUpData) {
    return this.http.post("https://ya-praktikum.tech/api/v2/auth/signup", {
      data,
    });
  }

  signIn(data: SignInData) {
    return this.http.post("https://ya-praktikum.tech/api/v2/auth/signin", {
      data,
    });
  }

  getUser() {
    return this.http.get("https://ya-praktikum.tech/api/v2/auth/user");
  }

  logOut() {
    return this.http.post("https://ya-praktikum.tech/api/v2/auth/logout");
  }
}
