import "./style.css";

import template from "./Chat.hbs?raw";
import Block, { type BlockOwnProps } from "../../framework/Block";
import type { FormMessageProps } from "../../components/FormMessage";

type ChatPreviewProps = {
  name: string;
  lastMessage: string;
  time: string;
  active?: boolean;
};

type SelectedChatProps = {
  name: string;
};

type MessageProps = {
  text: string;
  time: string;
  own?: boolean;
};

type ChatProps = BlockOwnProps & {
  chats: ChatPreviewProps[];
  selectedChat: SelectedChatProps;
  messages: MessageProps[];
  messageForm: FormMessageProps;
};

export default class Chat extends Block<ChatProps> {
  public static componentName = "Chat";

  protected template = template;
}
