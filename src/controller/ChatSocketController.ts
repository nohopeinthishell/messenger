type ChatSocketOptions = {
  userId: number;
  chatId: number;
  token: string;
  onMessage: (data: unknown) => void;
};

export default class ChatSocket {
  private socket: WebSocket | null = null;
  private userId: number;
  private chatId: number;
  private token: string;
  private onMessage: (data: unknown) => void;
  private pingInterval: number | null = null;

  constructor(options: ChatSocketOptions) {
    this.userId = options.userId;
    this.chatId = options.chatId;
    this.token = options.token;
    this.onMessage = options.onMessage;
  }

  connect() {
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`,
    );

    this.socket.addEventListener("open", () => {
      console.log("Соединение установлено");
      this.getOldMessages(0);
      this.pingInterval = window.setInterval(() => {
        this.sendPing();
      }, 10000);
    });

    this.socket.addEventListener("close", (event) => {
      this.clearPingInterval();
      console.log("Соединение закрыто", event);
    });

    this.socket.addEventListener("error", (event) => {
      console.log("Ошибка socket", event);
    });

    this.socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);

      this.onMessage(data);
    });
  }

  sendMessage(content: string) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket?.send(
        JSON.stringify({
          content: content,
          type: "message",
        }),
      );
    }
  }

  close() {
    this.clearPingInterval();
    this.socket?.close();
  }

  private sendPing() {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          type: "ping",
        }),
      );
    }
  }

  private clearPingInterval() {
    if (this.pingInterval !== null) {
      window.clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  getOldMessages(offset: number) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: String(offset),
          type: "get old",
        }),
      );
    }
  }
}
