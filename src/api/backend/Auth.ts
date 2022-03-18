import { AxiosRequestConfig } from "axios";
import * as Yup from 'yup';

import { catchReponse, processReponse } from "../core/ApiConsumer";
import { Controller } from "../core/Controller";
import { FormHelper } from "../core/Forms";
import { LoginSend, LoginSuccess, UserFull, UserLogin } from "../Types";

export class Auth extends Controller<UserLogin, UserFull> {

    loginForm: FormHelper<UserLogin>

    constructor(onLogin: (credentials: LoginSuccess) => void) {
        super('auth', () => `${process.env.REACT_APP_MASTER_KEY}`);



        this.loginForm = new FormHelper<UserLogin>({
            initialValues: {
                id: '',
                email: '',
                password: ''
            },
            onSubmit: (values) => this.login(values.email, values.password).then(onLogin),
            validationSchema: Yup.object({
                email: Yup.string().email().required(),
                password: Yup.string().min(6).required()
            })
        });
    }

    login(user: string, pass: string) {
        const credentials = btoa(user + ':' + pass);
        const basicAuth = 'Basic ' + credentials;
        const config = { headers: { "Authorization": basicAuth } };
        const data: LoginSend = {
            access_token: this.getAccessToken()
        }
        return this.create<LoginSuccess, LoginSend>(data, config);
    }

    create<R, S>(data: S, config?: AxiosRequestConfig): Promise<R> {
        return this.http
            .post<R, S>(this.endpoint.endpointUrl().toString(), data, config)
            .then(processReponse)
            .catch(catchReponse)
    }
}
