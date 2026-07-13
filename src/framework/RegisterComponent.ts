import Avatar from "../components/Avatar";
import AvatarUploadForm from "../components/AvatarUploadForm";
import Card from "../components/Card";
import FormAuth from "../components/FormAuth";
import FormMessage from "../components/FormMessage";
import FormProfile from "../components/FormProfile";
import Modal from "../components/Modal";
import ButtonUI from "../ui/ButtonUI";
import InputUI from "../ui/InputUI";
import LinkUI from "../ui/LinkUI";
import { registerComponent } from "./ComponentRegistry";

export function registerComponents() {
  registerComponent(InputUI);
  registerComponent(ButtonUI);
  registerComponent(LinkUI);
  registerComponent(Card);
  registerComponent(Avatar);
  registerComponent(FormAuth);
  registerComponent(FormProfile);
  registerComponent(FormMessage);
  registerComponent(Modal);
  registerComponent(AvatarUploadForm);
}
