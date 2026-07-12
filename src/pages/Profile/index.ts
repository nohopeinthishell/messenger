import "./style.css";

import template from "./Profile.hbs?raw";
import Block, { type BlockOwnProps } from "../../framework/Block";
import { authController } from "../../controller/AuthController";
import { connect } from "../../store/store";

type User = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name?: string;
  phone: string;
};

type ProfileProps = BlockOwnProps & {
  user: User;
};

class Profile extends Block<ProfileProps> {
  public static componentName = "Profile";

  protected events = {
    click: async (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link?.dataset.action !== "logout") {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      authController.logOut();
    },
  };

  protected template = template;
}

export default connect(Profile);
