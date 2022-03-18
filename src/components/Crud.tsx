import styled from "styled-components";

import {Controller} from "../api/core/Controller";
import {Modal} from "./Modal";
import {Table} from "./Table";
import {AutoForm} from "./Formulario";
import React, {useEffect, useRef, useState} from "react";

const Grid = styled.div`
  display: grid;
  justify-items: center;
  align-items: start;
  gap: 1em;
  grid-template:
    "component-table" auto
    "component-toolbar" 50px;
`;
const Toolbar = styled.div`
  display: grid;
  grid-area: component-toolbar;
  justify-content: end;
  width: 100%;
  border-radius: 16px;
`;

export interface CrudProps<S extends Controller<R, E>, R extends { id: string }, E> {
    controller: S;
}

export const Crud = <S extends Controller<R, E>, R extends { id: string }, E>({controller}: CrudProps<S, R, E>) => {
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
                       buttonTrigger={<i style={{fontSize: '50px'}} className='bx bx-plus-circle'/>}
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
            </Toolbar>
        </Grid>
    );
};
