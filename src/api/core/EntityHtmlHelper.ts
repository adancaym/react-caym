type TypeFieldEntityHtmlHelper = 'string' | 'number' | 'fk' | 'read' | 'date'

interface OptionsFieldEntityHtmlHelper {
    value: string;
    name: string;
}

export interface FieldEntityHtmlHelper<R> {
    key: string;
    label: string;
    type: TypeFieldEntityHtmlHelper,
    reducer?: (e: R) => JSX.Element | string;
    options?: () => Promise<Array<OptionsFieldEntityHtmlHelper>>;
}

export class EntityHtmlHelper<R> {
    fields: Array<FieldEntityHtmlHelper<R>>;

    constructor(fields: Array<FieldEntityHtmlHelper<R>>) {
        this.fields = fields;
        this.validateFields();
    }

    validateFields() {
        this.fields.forEach(field => {
            if (field.type === 'read' && !field.reducer) throw new Error(`No asignaste el reducer de: ${field.key}`);
            if (field.type === 'fk' && !field.options) throw new Error(`No asignaste el callback de opciones de: ${field.key}`);
        })
    }
}
