import * as Yup from "yup";

import {Controller} from "../core/Controller";
import {FormHelper} from "../core/Forms";
import {UserCreate, UserFull} from "../Types";
import {EntityHtmlHelper} from "../core/EntityHtmlHelper";
import {Groups} from "./Groups";
import {ArrayObjectReducer} from "../core/FieldReducers";

export class Users extends Controller<UserFull, UserCreate> {
    forms: FormHelper<UserCreate>
    table: EntityHtmlHelper<UserFull>

    constructor(getAccessToken?: () => string) {
        super('users', getAccessToken);
        this.forms = new FormHelper<UserCreate>({
            initialValues: {
                email: '',
                password: '',
                name: '',
                groups: [],
            },
            onSubmit: (values) => {
                if (values.id) {
                    return this.update(values.id, values)
                } else {
                    return this.create(values)
                }
            },
            validationSchema: Yup.object({
                email: Yup.string().email().required(),
                name: Yup.string().min(3).required()
            })
        });
        this.table = new EntityHtmlHelper<UserFull>([
            {type: 'id', key: 'id', label: 'id'},
            {type: 'text', key: 'email', label: 'email'},
            {type: 'text', key: 'name', label: 'Nombre'},
            {
                type: 'arraySelect',
                key: 'groups',
                label: 'Grupos',
                options: () => new Groups().options(),
                reducer: (o) => <ArrayObjectReducer array={o.groups}/>
            }
        ])
    }

    me(): Promise<UserFull> {
        return this.http.get<UserFull>(this.endpoint.appendUri('me').toString(), {
            headers: {
                'Authorization': this.getAccessToken()
            }
        }).then(r => r.data)
    }

    convert(object: UserFull): UserCreate {
        return {
            email: object.email,
            name: object.name,
            password: '',
            role: 'user',
            id: object.id,
            groups: object.groups.map(e => e.id)
        }
    }
}
