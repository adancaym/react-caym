import { log } from "../../redux/reducers/ui/actionsUi";
import { store } from "../../redux/Store";

export const Logger = (msg: string) => {
    store.dispatch(log(msg))
}
