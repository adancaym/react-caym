import * as Yup from "yup";

import {Controller} from "../core/Controller";
import {EntityHtmlHelper} from '../core/EntityHtmlHelper';
import {FormHelper} from "../core/Forms";
import {MenuCreate, MenuResponse} from "../Types";
import {ArrayObjectReducer, DateReducer} from "../core/FieldReducers";
import icons from "../Helpers/Icons.json";

export class Menus extends Controller<MenuResponse, MenuCreate> {
    constructor() {
        super('menus');
        this.table = new EntityHtmlHelper<MenuResponse>([
            {type: 'id', key: 'id', label: 'id'},
            {type: 'text', key: 'name', label: 'Nombre'},
            {type: 'text', key: 'path', label: 'Ruta'},
            {
                type: 'icon',
                key: 'icon',
                label: 'Icon',
                reducer: (o) => <i className={o.icon}/>,
                options: () => new Promise(resolve => resolve(icons))
            },
            {
                type: 'arraySelect',
                key: 'menus',
                label: 'menus',
                options: () => this.options(),
                reducer: (o) => <ArrayObjectReducer array={o.menus}/>
            },
            {
                type: 'dateReadOnly',
                key: 'createdAt',
                label: 'Fecha de creación',
                reducer: (e) => <DateReducer date={new Date(e.createdAt)}/>
            },
            {
                type: 'dateReadOnly',
                key: 'updatedAt',
                label: 'Fecha de actualización',
                reducer: (e) => <DateReducer date={new Date(e.updatedAt)}/>
            },
        ]);
        this.forms = new FormHelper<MenuCreate>({
            initialValues: {
                name: '',
                icon: '',
                menus: [],
                path: '',

            },
            //onSubmit: (values: MenuCreate) => this.create<MenuResponse, MenuCreate>(values),
            onSubmit: (values: MenuCreate) => {
                if (values.id) {
                    return this.update(values.id, values)
                } else {
                    return this.create(values)
                }
            },
            validationSchema: Yup.object({
                name: Yup.string().min(3).required(),
                icon: Yup.string().required(),
                path: Yup.string().min(1).required()
            })
        })
    }

    convert(object: MenuResponse) {
        return {
            id: object.id,
            name: object.name,
            menus: object.menus.map(value => value.id),
            icon: object.icon,
            path: object.path
        };
    }
}
