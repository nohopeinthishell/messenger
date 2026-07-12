import { BaseAPI } from "../framework/BaseAPI";
import HTTPTransport from "../framework/HTTPTransport";

export class ChatAPI extends BaseAPI {
  private http = new HTTPTransport();

  getChats() {
    return this.http.get("https://ya-praktikum.tech/api/v2/chats", {});
  }
}
