import {useFormik} from "formik";
import {useEffect, useState} from "react";
import styled from "styled-components";

import {
    EntityHtmlHelper,
    OptionsFieldEntityHtmlHelper,
    TypeFieldSelect,
    TypeFieldarraySelect,
    TypeFieldIcon
} from '../api/core/EntityHtmlHelper';

interface AutoFormProps<R, E> {
    initialValues: E;
    onSubmit: (data: E) => void;
    callBackSubmit?: () => void;
    validationSchema: any;
    table: EntityHtmlHelper<R>;
}

const FormStyle = styled.form`
  width: 90%;
`;
export const AutoForm = <R, E>(
    {
        table,
        initialValues,
        onSubmit,
        validationSchema,
        callBackSubmit
    }: AutoFormProps<R, E>) => {

    const {getFieldProps, getFieldMeta, isValid, handleSubmit, setFieldValue} =
        useFormik({
            initialValues,
            onSubmit: (values: E) => {
                onSubmit(values);
                if (callBackSubmit) callBackSubmit();
            },
            validationSchema,
        });

    return <FormStyle onSubmit={handleSubmit}>
        {table.fields.map((e) => {
            switch (e.type) {
                case "select": {
                    return (
                        <Select<TypeFieldSelect<R>, R>
                            {...getFieldProps(e.key)}
                            key={e.key}
                            field={e}
                        />
                    );
                }
                case "arraySelect": {

                    const handleChange = (event: any) => {
                        const {checked, value} = event.target;
                        if (checked) {
                            setFieldValue(e.key, [...getFieldMeta(e.key).value, value]);
                        } else {
                            setFieldValue(
                                "tags",
                                getFieldMeta(e.key).value.filter((v: any) => v !== value)
                            );
                        }
                    };

                    return (
                        <ArraySelect<TypeFieldarraySelect<R>, R>
                            {...getFieldProps(e.key)}
                            key={e.key}
                            field={e}
                            handleChange={handleChange}
                            selected={getFieldMeta(e.key).value}
                        />
                    );
                }
                case "id": {
                    return <></>
                }
                case "dateReadOnly": {
                    return <></>
                }
                case "readOnlyInTable": {
                    return <></>
                }
                case "icon": {
                    return <SelectIcon<TypeFieldIcon<R>, R>
                        {...getFieldProps(e.key)}
                        key={e.key}
                        field={e}
                    />
                }
                default: {
                    const {error} = getFieldMeta(e.key)
                    return (
                        <InputContainer>
                            <Label htmlFor={e.key}>{e.label}</Label>
                            <Input {...getFieldProps(e.key)} />
                            <Error>{error}</Error>
                        </InputContainer>
                    );
                }
            }
        })}
        <button disabled={!isValid} type="submit">Guardar</button>
    </FormStyle>
};

interface SelectProps<F> {
    field: F;
}

const Select = <F extends TypeFieldSelect<R>, R>({field, ...rest}: SelectProps<F>) => {
    const [options, setOptions] = useState<Array<OptionsFieldEntityHtmlHelper>>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        if (field.type === 'select' && field.options) field.options().then(setOptions).finally(() => setLoading(false));
    }, [field]);

    return (
        <SelectContainer>
            <label htmlFor={field.key}>{field.label}</label>
            {loading ? (
                <Loading/>
            ) : (
                <select {...rest} name={field.key} id={field.key}>
                    {options.map((option) => (
                        <option value={option.value}>{option.name}</option>
                    ))}
                </select>
            )}
        </SelectContainer>
    );
};
const SelectIcon = <F extends TypeFieldIcon<R>, R>({field, ...rest}: SelectProps<F>) => {
    const [options, setOptions] = useState<Array<string>>([]);
    const [loading, setLoading] = useState(false);
    // @ts-ignore
    const {value} = rest;
    useEffect(() => {
        setLoading(true);
        if (field.type === 'icon' && field.options) field.options().then(setOptions).finally(() => setLoading(false));
    }, [field]);

    return (
        <SelectContainer>
            <label htmlFor={field.key}>{field.label} <i className={value}/></label>
            {loading ? (
                <Loading/>
            ) : (
                <select name={field.key} id={field.key} value={value}>
                    {options.map((option) => (
                        <option value={option}>{option.replace('bx ', '')}</option>
                    ))}
                </select>
            )}
        </SelectContainer>
    );
};


interface ArraySelectProps<F> {
    field: F;
    handleChange: (e: any) => void;
    selected?: Array<string>;
}

const ArraySelect = <F extends TypeFieldarraySelect<R>, R>(
    {
        field,
        handleChange,
        selected = []
    }: ArraySelectProps<F>) => {

    const [options, setOptions] = useState<Array<OptionsFieldEntityHtmlHelper>>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        if (field.options) field.options().then(setOptions).finally(() => setLoading(false));
    }, [field]);

    return <ArraySelectContainer>
        <label htmlFor={field.key}>{field.label}</label>
        {loading ? (
            <Loading/>
        ) : (
            <CheckboxContainer>
                {options.map((option) => (
                    <CheckboxContainerRow>
                        <label htmlFor={option.value}>
                            <input onChange={handleChange} type={'checkbox'}
                                   checked={!!selected.find(e => e === option.value)}
                                   value={option.value}/> {option.name}
                        </label>
                    </CheckboxContainerRow>
                ))}
            </CheckboxContainer>
        )}
    </ArraySelectContainer>
};


const CheckboxContainer = styled.div`
  grid-area: container;
  display: grid;
  gap: 1em;
  max-height: 200px;
  overflow: auto;
  grid-auto-flow: column;

  label {
    text-align: left;
    justify-self: start;
  }
`
const CheckboxContainerRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: 98%;

  input {
    margin-top: 4px;
  }
`


const ArraySelectContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template: "label container" 1fr /150px 1fr;
  justify-items: start;
`;


///__________________________________________________________________________________________________________________
const Loading = styled.div`
  justify-self: end;
  display: inline-block;

  &:after {
    content: " ";
    display: block;
    width: 10px;
    height: 10px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SelectContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns:  150px 1fr;
  justify-items: start;

  & > select {
    width: 98%;
    justify-self: end;
  }
`;
const InputContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 1em;
  grid-template:
          "label input" auto 
          "error error" auto /
           150px 1fr;
  justify-items: start;
`;
const Label = styled.label`
  grid-area: label;
`
const Input = styled.input`
  grid-area: input;
  width: 100%;
`
const Error = styled.p`
  grid-area: error;
  color: red;
  text-align: center
`
