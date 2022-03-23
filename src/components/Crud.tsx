import styled from "styled-components";

import {Controller} from "../api/core/Controller";
import {Modal} from "./Modal";
import {Table} from "./Table";
import {AutoForm} from "./Formulario";
import React, {useRef} from "react";

const Grid = styled.div`
  display: grid;
  gap: 1em;
  height: 100%;
  grid-template:
    "component-table" 1fr
    "component-toolbar" 90px /
     1fr;
`;
const Toolbar = styled.div`
  display: grid;
  gap: 1em;
  grid-area: component-toolbar;
  justify-content: start;
  align-items: center;
  height: 80px;
  width: 100%;
  border-radius: 16px;
  border: 1px solid black;
  grid-auto-flow: column;
`;

export interface CrudProps<S extends Controller<R, E>, R extends { id: string }, E> {
    controller: S;
    children?: JSX.Element | JSX.Element[]
}

export const Crud = <S extends Controller<R, E>, R extends { id: string }, E>({controller, children}: CrudProps<S, R, E>) => {
    const childRef = useRef<any>();
    const closeModal = () => {
        childRef.current.clickAccept();
    };
    return (
        <Grid>
            <Table<S, R, E> controller={controller}/>
            <Toolbar>
                <Modal ref={childRef}
                       title={"Crear"}
                       buttonText="Agregar"
                       buttonTrigger={<i style={{fontSize: '50px', marginLeft: '10px'}} className='bx bx-plus-circle'/>}
                       showModalActions={false}
                >
                    {controller.forms !== undefined ? (
                        <AutoForm<R, E>
                            table={controller.table}
                            initialValues={controller.forms.initialValues}
                            onSubmit={controller.forms.onSubmit}
                            validationSchema={controller.forms.validationSchema}
                            callBackSubmit={closeModal}
                        />
                    ) : (
                        <>No hay un formulario definido</>
                    )}
                </Modal>
                <>{children}</>
            </Toolbar>
        </Grid>
    );
};
