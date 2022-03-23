import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Controller} from "../api/core/Controller";
import {FieldEntityHtmlHelper} from '../api/core/EntityHtmlHelper';
import {CrudProps} from "./Crud";
import {Modal} from "./Modal";
import {AutoForm} from "./Formulario";
import {ButtonDanger, ButtonPrimary} from "./common/Button";
import {Input} from "./common/Input";

const GridTable = styled.div`
  grid-area: component-table;
  display: grid;
  gap: 1em;
  border-radius: 16px;
  padding: 0 1em;
  grid-template:
    "filter" 50px
    "tabla" 1fr
    "pagination" 50px /
    auto;
`;

const Filters = styled.div`
  grid-area: filter;
  display: grid;
  grid-template-columns:  90% 10%;
`;
const TableStyle = styled.table`
  grid-area: tabla;
  table-layout: fixed;
  border-radius: 16px;
`;
const PaginationStyle = styled.div`
  grid-area: pagination;
  justify-self: center;
  display: grid;
  gap: 1em;
  grid-template: "pagination-button-prev pagination-info pagination-button-next" 1fr;
`;

const PaginationInfo = styled.span`
  display: grid;
  grid-area: pagination-info;
  height: 50px;
  gap: 1em;
  justify-items: center;
  align-content: center;
  align-items: center;
  grid-template: "pagination-info-total-rows  pagination-info-current-page  pagination-info-total-pages" 1fr;
`;
const PaginationInfoTotalRow = styled.span`
  grid-area: pagination-info-total-rows;
`;
const PaginationInfoCurrenPage = styled.span`
  grid-area: pagination-info-current-page;
`;
const PaginationInfoTotalPages = styled.span`
  grid-area: pagination-info-total-pages;
`;


const TrStyle = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;

  &:nth-child(even) {
    background-color: #DDDDDD;
  }
`;
const TheadStyle = styled.thead`
  font-size: 18px;
  text-align: center;
  display: table;
  width: 100%;
  table-layout: fixed; /* even columns width , fix width of table too*/
`;
const TbodyStyle = styled.tbody`
  font-size: 18px;
  text-align: center;
  display: block;
  max-height: 300px;
  min-height: 300px;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;


interface RenderActionsProps<S extends Controller<R, E>, R extends { id: string }, E> extends CrudProps<S, R, E> {
    object: E,
    callBackUpdate: () => Promise<void>
    id: string;
}

const RenderActionsStyle = styled.div`
  display: grid;
  grid-auto-flow: column;
`
const RenderActions = <S extends Controller<R, E>, R extends { id: string }, E>(
    {
        controller,
        object,
        id,
        callBackUpdate
    }: RenderActionsProps<S, R, E>) => {
    const childRef = useRef<any>();
    const closeModal = () => {
        callBackUpdate().then(() => {
            childRef.current.clickAccept();
        })
    };
    const acceptDelete = () => {
        controller.delete(id).then(() => {
            callBackUpdate();
        })
    }
    return <RenderActionsStyle>
        <Modal ref={childRef} title={"Actualizar"} buttonText="Actualizar"
               buttonTrigger={<ButtonPrimary className='bx bx-pencil'/>} showModalActions={false}>
            {controller.forms !== undefined ? (
                <AutoForm<R, E>
                    table={controller.table}
                    initialValues={object}
                    onSubmit={controller.forms.onSubmit}
                    validationSchema={controller.forms.validationSchema}
                    callBackSubmit={closeModal}
                />
            ) : (
                <>No hay un formulario definido</>
            )}
        </Modal>
        <Modal title={"Eliminar"} buttonTrigger={<ButtonDanger className='bx bx-trash'/>}
               onAccept={acceptDelete}>
            <h1>¿Deseas eliminar el registro?</h1>
        </Modal>
    </RenderActionsStyle>
}


export const Table = <S extends Controller<R, E>, R extends { id: string }, E>({
                                                                                   controller,
                                                                               }: CrudProps<S, R, E>) => {
    const [rows, setRows] = useState<Array<R>>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = () => {
        return controller.list<R>().then((r) => {
            const totalPagesFetch = parseInt((1 + r.count / controller.pagination.limit).toString())
            setRows(r.rows);
            setTotal(r.count);
            setTotalPages(totalPagesFetch === 0 ? 1 : totalPagesFetch);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const searchKeyword = async (keyword: string) => {
        if (keyword !== "") {
            controller.pagination.q = keyword;
            controller.pagination.page = 1;
        } else {
            controller.pagination.q = undefined;
        }
        await fetchData();
    };


    const renderProp = (object: R, field: FieldEntityHtmlHelper<R>) => {

        const mapped = Object
            .entries(object)
            .map(([key, value]) => ({
                key,
                value
            }))
            .find((object) => object.key === field.key);

        if (
            field.type === 'checkbox' ||
            field.type === 'date' ||
            field.type === 'dateReadOnly' ||
            field.type === 'select' ||
            field.type === 'icon' ||
            field.type === 'arraySelect'
        ) {
            if (field.reducer) return field.reducer(object);
        }

        if (mapped) return mapped.value;
    };

    const page = async (value: number) => {
        controller.pagination.changePage(value)
        await fetchData();
    };

    return (
        <GridTable>
            <Filters>
                <Input
                    placeholder={"Search"}
                    type="text"
                    onChange={({target}) => searchKeyword(target.value)}
                    style={{width: '100%'}}
                />
                <ButtonPrimary
                    className="bx bx-search-alt-2"
                    onClick={() => fetchData()}
                />
            </Filters>
            <TableStyle>
                <TheadStyle>
                    <TrStyle>
                        <th style={{width: "40px"}}>N</th>
                        {controller.table.fields.map((field, index) => (
                            <th key={`${field.key} ${index}`}>{field.label}</th>
                        ))}
                        <th>Acciones</th>
                    </TrStyle>
                </TheadStyle>
                <TbodyStyle>
                    {rows.length === 0 ? (
                        <TrStyle>
                            <td colSpan={controller.table.fields.length}>Sin datos</td>
                        </TrStyle>
                    ) : rows.map((object, index) => (
                        <TrStyle key={index}>
                            <td style={{width: "40px"}}>{index + 1}</td>
                            {controller.table.fields.map((field, index) => (
                                <td key={`${field.key} row ${index}`}>
                                    {renderProp(object, field)}
                                </td>
                            ))}
                            <td>
                                <RenderActions<S, R, E>
                                    controller={controller}
                                    object={controller.convert(object)}
                                    id={object.id}
                                    callBackUpdate={() => fetchData()}
                                />
                            </td>
                        </TrStyle>
                    ))}
                </TbodyStyle>
            </TableStyle>
            <PaginationStyle>
                <ButtonPrimary
                    disabled={controller.pagination.page <= 1}
                    onClick={() => page(-1)}
                >
                    {"<"}
                </ButtonPrimary>
                <PaginationInfo>
                    <PaginationInfoTotalRow>Total: {total}</PaginationInfoTotalRow>
                    <PaginationInfoCurrenPage>
                        Página: {controller.pagination.page}
                    </PaginationInfoCurrenPage>
                    <PaginationInfoTotalPages>
                        Total de páginas: {totalPages}
                    </PaginationInfoTotalPages>
                </PaginationInfo>
                <ButtonPrimary
                    disabled={controller.pagination.page >= totalPages}
                    onClick={() => page(1)}
                >
                    {">"}
                </ButtonPrimary>
            </PaginationStyle>
        </GridTable>
    );
};
