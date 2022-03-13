export interface IOptions {
    params: any;
}

export class Endpoint {
    uri: string;
    base: string;

    constructor(base: string, uri: string) {
        this.uri = uri;
        this.base = base;
    }

    endpointUrl(): URL {
        return new URL(this.uri, this.base);
    }

    processUrl(url: URL, options?: IOptions) {
        if (options) url.search = new URLSearchParams(options.params).toString();
        return url.toString();
    }

    appendUri(uri: string, base?: string): URL {
        return base ? new URL(`${base}/${uri}`) : new URL(`${this.endpointUrl().toString()}/${uri}`);
    }
}
