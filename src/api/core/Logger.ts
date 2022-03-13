import {store} from "../../redux/Store";
import {log} from "../../redux/reducers/ui/actionsUi";

export const Logger = (msg: string) => {
    store.dispatch(log(msg))
}
