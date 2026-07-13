import { BaseAPI } from "../framework/BaseAPI";
import HTTPTransport from "../framework/HTTPTransport";

export class ChatAPI extends BaseAPI {
  private http = new HTTPTransport();
  private baseUrl = "https://ya-praktikum.tech/api/v2";

  getChats() {
    return this.http.get(`${this.baseUrl}/chats`);
  }

  createChat(title: string) {
    return this.http.post(`${this.baseUrl}/chats`, {
      data: { title },
    });
  }

  deleteChat(chatId: number) {
    return this.http.delete(`${this.baseUrl}/chats`, {
      data: { chatId },
    });
  }

  addUserToChat(chatId: number, userId: number) {
    return this.addUsersToChat(chatId, [userId]);
  }

  addUsersToChat(chatId: number, userIds: number[]) {
    return this.http.put(`${this.baseUrl}/chats/users`, {
      data: {
        users: userIds,
        chatId,
      },
    });
  }

  deleteUsersFromChat(chatId: number, userIds: number[]) {
    return this.http.delete(`${this.baseUrl}/chats/users`, {
      data: {
        users: userIds,
        chatId,
      },
    });
  }
}
