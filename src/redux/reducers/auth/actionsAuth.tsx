import {authActionsName} from "./Types";
import {UserFull} from "../../../api/Types";

export const login = (user: UserFull, token: string) => ({
    type: authActionsName.login,
    payload: {user, token: ` Bearer ${token}`}
})
export const logout = () => ({
    type: authActionsName.logout
})
