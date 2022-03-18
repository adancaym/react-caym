import { ApiConsumer, ResponseFormat } from "./ApiConsumer";
import { Endpoint } from "./Endpoint";
import { OptionsFieldEntityHtmlHelper } from './EntityHtmlHelper';

export class BackendConsumer extends ApiConsumer {
    getAccessToken: () => string;
    constructor(uri: string, getAccessToken?: () => string) {
        super(new Endpoint(process.env.REACT_APP_BACKEND_URL || '', uri));
        this.useQueryParams = true;
        if (getAccessToken) this.getAccessToken = getAccessToken;
        else {
            this.getAccessToken = () => this.session.getToken();
        }
    }

    create<R, S>(object: S): Promise<R> {
        return super
            .create<R, S>(
                object,
                undefined,
                {
                    headers: {
                        'Authorization': this.getAccessToken()
                    }
                });
    }

    update<R, S>(id: string, object: S): Promise<R> {
        return super
            .update<R, S>(
                id,
                object,
                undefined,
                {
                    headers: { 'Authorization': this.getAccessToken() }
                }
            );
    }

    delete<R>(id: string): Promise<R> {
        return super
            .delete<R>(
                id,
                undefined,
                {
                    headers: { 'Authorization': this.getAccessToken() }
                }
            );
    }

    list<R>(): Promise<ResponseFormat<R>> {
        return super
            .list<R>(
                this.useQueryParams ? this.pagination.getParams() : undefined,
                {
                    headers: { 'Authorization': this.getAccessToken() }
                }
            );
    }

    one<R>(id: string): Promise<R> {
        return super
            .one<R>(
                id,
                undefined,
                {
                    headers: { 'Authorization': this.getAccessToken() }
                }
            );
    }
    options<R extends { name: string, id: string }>(): Promise<Array<OptionsFieldEntityHtmlHelper>> {
        this.pagination.page = 1;
        this.pagination.limit = 1;
        return this.list<R>().then(r => {
            this.pagination.limit = r.count
            return this.list<R>()
                .then(r => r.rows.map((e: R) => {
                    const option: OptionsFieldEntityHtmlHelper = {
                        name: e.name,
                        value: e.id
                    }
                    return option
                }));
        })
    }
}


