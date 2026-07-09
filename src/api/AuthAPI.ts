import { BaseAPI } from "../controller/BaseAPI";
import HTTPTransport from "../controller/HTTPTransport";

export type SignUpData = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
};

type SignInData = {
  login: string;
  password: string;
};

export class AuthAPI extends BaseAPI {
  private http = new HTTPTransport();

  signup(data: SignUpData) {
    return this.http.post("https://ya-praktikum.tech/api/v2/auth/signup", {
      data,
    });
  }

  signin(data: SignInData) {
    return this.http.post("https://ya-praktikum.tech/api/v2/auth/signin", {
      data,
    });
  }
}
