import { UserFull } from "../api/Types";
import { authActionsName } from "./reducers/auth/Types";

export interface StateAuth {
  user?: UserFull;
  token?: string;
}

export interface StateUI {
  sidebar: {
    show: boolean;
  };
  logs?: Array<string>;
}

export interface StateApp {
  auth?: StateAuth;
  ui?: StateUI;
}

export interface Reducers {
  auth: any;
  ui: any;
}

export interface Action {
  type: string;
  payload: any;
}

export const Types = {
  ...authActionsName,
};
