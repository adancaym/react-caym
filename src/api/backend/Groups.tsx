import * as Yup from "yup";

import {Controller} from "../core/Controller";
import {EntityHtmlHelper} from '../core/EntityHtmlHelper';
import {FormHelper} from "../core/Forms";
import {GroupCreate, GroupResponse} from "../Types";
import {ArrayObjectReducer, DateReducer} from "../core/FieldReducers";
import {Menus} from "./Menus";

const menus = new Menus();
export class Groups extends Controller<GroupResponse, GroupCreate> {
    constructor() {
        super('groups');
        this.table = new EntityHtmlHelper<GroupResponse>([
            {type: 'id', key: 'id', label: 'id'},
            {type: 'text', key: 'name', label: 'Nombre'},
            {
                type: 'arraySelect',
                key: 'menus',
                label: 'menus',
                options: () => menus.options(),
                reducer: (o) => <ArrayObjectReducer array={o.menus}/>
            },
            {
                type: 'dateReadOnly',
                key: 'createdAt',
                label: 'Fecha de creación',
                reducer: (e) => <DateReducer date={new Date(e.createdAt)} />
            },
            {
                type: 'dateReadOnly',
                key: 'updatedAt',
                label: 'Fecha de actualización',
                reducer: (e) => <DateReducer date={new Date(e.updatedAt)} />
            },
        ]);
        this.forms = new FormHelper<GroupCreate>({
            initialValues: {
                name: '',
                menus: [],
            },
            onSubmit: (values: GroupCreate) => {
                if (values.id) {
                    return this.update(values.id, values)
                } else {
                    return this.create(values)
                }
            },
            validationSchema: Yup.object({
                name: Yup.string().min(3).required(),
                groups: Yup.array(),
            })
        })
    }

    convert(object: GroupResponse) {
        return {
            id: object.id,
            name: object.name,
            menus: object.menus.map(value => value.id),
        };
    }
}
