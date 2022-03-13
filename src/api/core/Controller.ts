import {BackendConsumer} from "./BackendConsumer";
import {FormHelper, IForm} from "./Forms";
import {EntityHtmlHelper} from "./EntityHtmlHelper";

export class Controller<R,S> extends BackendConsumer {

    forms: FormHelper<S>[];
    table: EntityHtmlHelper<R>;

    constructor(uri: string, getAccessToken?: () => string) {
        super(uri, getAccessToken);
        this.forms = []
        this.table = new EntityHtmlHelper<R>([]);
    }

    appendForm(form: IForm<S>) {
        this.forms.push(form);
    }
}
