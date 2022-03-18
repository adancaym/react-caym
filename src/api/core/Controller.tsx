import {BackendConsumer} from "./BackendConsumer";
import {EntityHtmlHelper} from "./EntityHtmlHelper";
import {FormHelper} from "./Forms";

export class Controller<R extends { id: string }, E> extends BackendConsumer {

    forms?: FormHelper<E>;
    table: EntityHtmlHelper<R>;

    constructor(uri: string, getAccessToken?: () => string) {
        super(uri, getAccessToken);
        this.forms = undefined
        this.table = new EntityHtmlHelper<R>([]);
    }

    convert(object: R): E {
        return {} as E;
    }
}
