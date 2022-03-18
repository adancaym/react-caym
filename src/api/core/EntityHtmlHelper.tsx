export interface TypeFieldText {
    type: 'text',
    key: string;
    label: string;
}
export interface TypeFieldId {
    type: 'id',
    key: string;
    label: string;
}
export interface TypeFieldNumber {
    type: 'id',
    key: string;
    label: string;
}
export interface TypeFieldPassword {
    type: 'password',
    key: string;
    label: string;
}
export interface TypeFieldReadOnlyInTable {
    type: 'readOnlyInTable',
    key: string;
    label: string;
}
export interface TypeFieldCheckbox<R> {
    type: 'checkbox',
    key: string;
    label: string;
    reducer: (e: R) => JSX.Element;
}
export interface TypeFieldDate<R> {
    type: 'date',
    key: string;
    label: string;
    reducer: (e: R) => JSX.Element;
}
export interface TypeFieldDateReadOnly<R> {
    type: 'dateReadOnly',
    key: string;
    label: string;
    reducer: (e: R) => JSX.Element;
}
export interface TypeFieldSelect<R> {
    type: 'select',
    key: string;
    label: string;
    reducer: (e: R) => JSX.Element;
    options: () => Promise<Array<OptionsFieldEntityHtmlHelper>>;
}
export interface TypeFieldarraySelect<R> {
    type: 'arraySelect',
    key: string;
    label: string;
    reducer: (e: R) => JSX.Element;
    options: () => Promise<Array<OptionsFieldEntityHtmlHelper>>;
}

export interface OptionsFieldEntityHtmlHelper {
    value: string;
    name: string;
}

export type FieldEntityHtmlHelper<R> = TypeFieldText | TypeFieldId | TypeFieldNumber | TypeFieldPassword | TypeFieldReadOnlyInTable | TypeFieldCheckbox<R> | TypeFieldDate<R> | TypeFieldDateReadOnly<R> | TypeFieldSelect<R> | TypeFieldarraySelect<R>

export class EntityHtmlHelper<R> {
    fields: Array<FieldEntityHtmlHelper<R>>;

    constructor(fields: Array<FieldEntityHtmlHelper<R>>) {
        this.fields = fields;
    }

}
