import {UserFull} from "../../../api/Types";
import {authActionsName} from "./Types";

export const login = (user: UserFull, token: string) => ({
    type: authActionsName.login,
    payload: {user, token: `Bearer ${token}`},
});
export const logout = () => ({
    type: authActionsName.logout,
});
export const me = (user: UserFull) => ({
    type: authActionsName.me,
    payload: {user}
});
