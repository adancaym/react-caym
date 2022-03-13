import {uiActionsName} from "./Types";

export const showSideBar = () => ({
    type: uiActionsName.sidebar.show,
})
export const hideSideBar = () => ({
    type: uiActionsName.sidebar.hide,
})
export const log = (msg: string) => ({
    type: uiActionsName.log,
    payload: {msg}
})

