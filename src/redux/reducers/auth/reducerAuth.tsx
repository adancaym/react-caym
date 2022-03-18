import { Action, StateAuth, Types } from "../../Types";

// los reducers regresan al objeto llamado

/*
 *  state {
 *   auth <- a este objeto se llama auth, por lo tanto el payload se asigna a auth aislando los objetos por reducer
 * }
 *
 * */
export const reducerAuth = (
  state: StateAuth = { user: undefined, token: undefined },
  { type, payload }: Action
) => {
  switch (type) {
    case Types.login: {
      return {
        ...state,
        user: payload.user,
        token: payload.token,
      };
    }
    case Types.logout: {
      return {};
    }
    default: {
      return state;
    }
  }
};
