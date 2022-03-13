import {BackendConsumer} from "../core/BackendConsumer";
import {FormHelper} from "../core/Forms";
import {UserCreate, UserFull} from "../Types";
import * as Yup from "yup";
import {Controller} from "../core/Controller";

export class Users extends Controller<UserFull, UserCreate> {
    signUpForm: FormHelper<UserCreate>
    constructor() {
        super('users', () => `Bearer ${process.env.REACT_APP_MASTER_KEY}`);
        this.signUpForm = new FormHelper<UserCreate>({
            initialValues: {
                email: '',
                password: '',
                name: ''
            },
            onSubmit: (values) => this.create(values),
            validationSchema: Yup.object({
                email: Yup.string().email().required(),
                password: Yup.string().min(6).required(),
                name: Yup.string().min(3).required()
            })
        });
    }
}
