import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { Endpoint, IOptions } from "./Endpoint";
import { HttpClient } from "./HttpClient";
import { Logger } from "./Logger";
import { PaginationHandler } from "./PaginationHandler";
import { SessionManager } from "./SessionManager";
import statusCode from '../Helpers/StatusCodes.json';

interface IApiConsumer {
}

export interface ResponseFormat<R> {
    rows: Array<R>,
    count: number;
}
export const processReponse = <R>({ status, data, headers, config }: AxiosResponse<R>) => {
    const msg = statusCode.find(sc => sc.code === status)?.msg || '';
    const { url, data: configData, method } = config;
    Logger(`Method: ${method}, url: ${url}, ${JSON.stringify(configData)} ${msg}`)
    return data;
}
export const catchReponse = ({ message, config }: AxiosError) => {
    const { url, data: configData, method } = config;
    Logger(`Method: ${method}, url ${url} ${message} ${JSON.stringify(configData)}`)
    throw Error('Handled')
}

export class ApiConsumer implements IApiConsumer {

    endpoint: Endpoint;
    http: HttpClient;
    pagination: PaginationHandler;
    useQueryParams: boolean;
    session: SessionManager;

    constructor(endpoint: Endpoint) {
        this.endpoint = endpoint;
        this.http = new HttpClient();
        this.pagination = new PaginationHandler();
        this.useQueryParams = true;
        this.session = new SessionManager();
    }

    create<R, S>(object: S, options?: IOptions, config?: AxiosRequestConfig): Promise<R> {
        return this.http
            .post<R, S>(this.endpoint.processUrl(this.endpoint.endpointUrl(), options), object, config)
            .then(processReponse)
            .catch(catchReponse)
    }

    update<R, S>(id: string, object: S, options?: IOptions, config?: AxiosRequestConfig): Promise<R> {
        return this.http
            .put<R, S>(this.endpoint.processUrl(this.endpoint.appendUri(id), options), object, config)
            .then(processReponse)
            .catch(catchReponse)
    }

    list<R>(options?: IOptions, config?: AxiosRequestConfig): Promise<ResponseFormat<R>> {
        return this.http
            .get<ResponseFormat<R>>(this.endpoint.processUrl(this.endpoint.endpointUrl(), options), config)
            .then(processReponse)
            .catch(catchReponse)
    }

    one<R>(id: string, options?: IOptions, config?: AxiosRequestConfig): Promise<R> {
        return this.http
            .get<R>(this.endpoint.processUrl(this.endpoint.appendUri(id), options), config)
            .then(processReponse)
            .catch(catchReponse)
    }

    delete<R>(id: string, options?: IOptions, config?: AxiosRequestConfig): Promise<R> {
        return this.http
            .delete<R>(this.endpoint.processUrl(this.endpoint.appendUri(id), options), config)
            .then(processReponse)
            .catch(catchReponse)
    }
}

