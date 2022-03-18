import { Action, StateUI } from "../../Types";
import { uiActionsName } from "./Types";

export const reducerUi = (
  state: StateUI = { logs: [], sidebar: { show: false } },
  { type, payload }: Action
) => {
  switch (type) {
    case uiActionsName.sidebar.show: {
      return {
        ...state,
        sidebar: {
          show: true,
        },
      };
    }
    case uiActionsName.sidebar.hide: {
      return {
        ...state,
        sidebar: {
          show: false,
        },
      };
    }
    case uiActionsName.log: {
      const { logs } = state;
      const { msg } = payload;
      logs?.push(msg);
      return {
        ...state,
        logs,
      };
    }
    default: {
      return state;
    }
  }
};
