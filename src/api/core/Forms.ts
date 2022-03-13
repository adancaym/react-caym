export interface IForm<E> {
    initialValues: E;
    onSubmit: (data: E) => void;
    validationSchema: any;
}

export class FormHelper<E> implements IForm<E> {
    initialValues: E;
    onSubmit: (data: E) => void;
    validationSchema: any;

    constructor({initialValues, onSubmit, validationSchema}: IForm<E>) {
        this.initialValues = initialValues;
        this.onSubmit = onSubmit;
        this.validationSchema = validationSchema;
    }
}
