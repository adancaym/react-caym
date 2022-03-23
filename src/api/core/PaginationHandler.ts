import {IOptions} from "./Endpoint";

export class PaginationHandler {
    page: number;
    limit: number;
    sort: string;
    q: string | undefined;

    constructor() {
        this.q = undefined
        this.page = 1;
        this.limit = 30;
        this.sort = '-createdAt'
    }

    getParams(): IOptions {
        let result;
        if (this.q) {
            result = {
                params: {
                    page: this.page,
                    limit: this.limit,
                    sort: this.sort,
                    q: this.q
                }
            }
        } else {
            result = {
                params: {
                    page: this.page,
                    limit: this.limit,
                    sort: this.sort,
                }
            }
        }
        return result;
    }

    changePage(value: number): void {
        this.page = this.page + value;
    }
}
