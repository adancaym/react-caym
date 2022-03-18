import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * R => hace referencia al tipo esperado en el retorno {"R"eturn} "Entidad que responde el servicio"
 * S => hace referencia al tipo esperado en el envio {"S"end}"Entidad que espera el servidor"
 */
interface IHttpClient {
    get: <R>(url: string, headers?: AxiosRequestConfig) => Promise<AxiosResponse<R>>;
    post: <R, S>(url: string, data: S, headers?: AxiosRequestConfig) => Promise<AxiosResponse<R>>;
    put: <R, S>(url: string, data: S, headers?: AxiosRequestConfig) => Promise<AxiosResponse<R>>;
    delete: <R>(url: string, headers?: AxiosRequestConfig) => Promise<AxiosResponse<R>>;
}


export class HttpClient implements IHttpClient {

    get<R>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
        return axios.get(url, config);
    }

    post<R, S>(url: string, data: S, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
        return axios.post(url, data, config);
    }

    put<R, S>(url: string, data: S, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
        return axios.put(url, data, config);
    }

    delete<R>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
        return axios.delete(url, config);
    }
}
