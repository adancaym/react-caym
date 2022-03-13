import {BackendConsumer} from "../core/BackendConsumer";
import {FormHelper} from "../core/Forms";
import {MenuCreate, MenuResponse} from "../Types";
import * as Yup from "yup";
import {EntityHtmlHelper} from "../core/EntityHtmlHelper";
import {Controller} from "../core/Controller";

export class Menus extends Controller<MenuResponse, MenuCreate> {
    constructor() {
        super('menus');
        const emptyEntity: MenuCreate = {
            name: '',
            icon: '',
            menus: [],
            path: '',
        }

        this.table = new EntityHtmlHelper<MenuResponse>([
            {type: 'string', key: 'id', label: 'id'},
            {type: 'string', key: 'name', label: 'Nombre'},
            {type: 'string', key: 'icon', label: 'Icono'},
            {type: 'string', key: 'path', label: 'path'},
            {
                type: 'date',
                key: 'createdAt',
                label: 'Fecha de creación',
                reducer: (e) => new Date(e.createdAt).toLocaleDateString()
            },
            {
                type: 'date',
                key: 'updatedAt',
                label: 'Fecha de actualización',
                reducer: (e) => new Date(e.updatedAt).toLocaleDateString()
            },
        ]);
        this.forms = [
            new FormHelper<MenuCreate>({
                initialValues: emptyEntity,
                onSubmit: (values: MenuCreate) => this.create<MenuResponse, MenuCreate>(values),
                validationSchema: Yup.object({
                    name: Yup.string().min(3).required(),
                    icon: Yup.string().required(),
                    path: Yup.string().min(6).required()
                })
            })
        ]
    }
}
