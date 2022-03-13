import styled from "styled-components";
import {Menus} from "../api/backend/Menus";
import {MenuCreate, MenuResponse} from "../api/Types";
import {Table} from "./Table";
import {Controller} from "../api/core/Controller";
import {useState} from "react";

const Grid = styled.div`
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: start;
  gap: 1em;
  grid-template:
          "component-table" auto
          "component-toolbar" 50px;
`
const Toolbar = styled.div`
  display: grid;
  grid-area: component-toolbar;
  width: 100%;
  height: 100%;
  background-color: #202020;
  border: 1px solid #202020;
  border-radius: 16px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
`

export interface CrudProps<S extends Controller<R, E>, R, E> {
    controller: S
}


export const Crud = <S extends Controller<R, E>, R, E>({controller}: CrudProps<S, R, E>) => {
    return (
        <Grid>
            <Table<S, R, E> controller={controller}/>
            <Toolbar>
                <Modal
                    title={'My modal'}>
                    <Modal
                        title={'My modal'}>
                        <>asd</>
                    </Modal>
                </Modal>
            </Toolbar>
        </Grid>
    )
}


const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: 100vh;
  background-color: rgba(20, 20, 20, .8);
`
const ModalContainer = styled.div`
  display: grid;
  position: fixed;
  top: 20%;
  left: 15%;
  width: 70%;
  background-color: #181818;
  border: 1px solid #181818;
  box-shadow: 0px 6px 33px 21px rgba(0, 0, 0, 0.75);
  opacity: 1;
  min-height: 500px;
  padding: 2em;
  border-radius: 16px;
  grid-template: 
          "ModalHeader" 50px
          "ModalContent" auto
          "ModalFooter" 50px
          "ModalActions" min-content;
  gap: 1em;
`

const ModalHeader = styled.div`
  display: grid;
  grid-area: ModalHeader;
  grid-template: "ModalHeaderTitle ModalHeaderButtonClose" 1fr / 1fr 50px;
`
const ModalContent = styled.div`
  grid-area: ModalContent;
  display: grid;
  justify-self: center;
  align-items: center;
`
const ModalFooter = styled.div`
  grid-area: ModalFooter;
`
const ModalActions = styled.div`
  grid-area: ModalActions;
  display: grid;
  gap: 1em;
  grid-template-columns: 10% 10%;
  align-items: end;
  justify-content: end;
`
const ModalHeaderTitle = styled.h1`
  grid-area: ModalHeaderTitle;
  align-self: center;
  justify-self: center;
  color: #DDDDDD;
`
const ModalHeaderButtonClose = styled.button`
  grid-area: ModalHeaderButtonClose;
  background-color: #202020;
  box-shadow: 10px 10px 5px 0 rgba(0, 0, 0, 0.75);
  border: none;
  cursor: pointer;
  color: red;
  border-radius: 16px;

  &:active {
    background-color: #181818;
  }
`

export interface ModalProps {
    children: JSX.Element | JSX.Element[],
    title: string;
    onCancel?: () => void;
    onAccept?: () => void;
    onClose?: () => void
    footer?: JSX.Element | JSX.Element[];
}

export const Modal = ({children, title, footer}: ModalProps) => {
    const [display, setDisplay] = useState(false);

    const clickOpen = () => {
        setDisplay(true)
    }
    const clickClose = () => {
        setDisplay(false)
    }
    const clickAccept = () => {
        setDisplay(false)
    }
    const clickCancel = () => {
        setDisplay(false)
    }
    return <>
        <button onClick={clickOpen}>modal</button>
        {display && <ModalBackDrop>
            <ModalContainer>
                <ModalHeader><ModalHeaderTitle>{title}</ModalHeaderTitle><ModalHeaderButtonClose onClick={clickClose}>X</ModalHeaderButtonClose></ModalHeader>
                <ModalContent>{children}</ModalContent>
                {footer ? <ModalFooter>{footer}</ModalFooter> : <></>}
                <ModalActions>
                    <CancelButton onClick={clickCancel}>Cancelar</CancelButton>
                    <AcceptButton onClick={clickAccept}>Aceptar</AcceptButton>
                </ModalActions>
            </ModalContainer>
        </ModalBackDrop>}
    </>
}

const AcceptButton = styled.button`
  height: 50px;
  background-color: #202020;
  box-shadow: 10px 10px 5px 0 rgba(0, 0, 0, 0.75);
  border: none;
  cursor: pointer;
  border-radius: 16px;
  color: aqua;

  &:active {
    background-color: #181818;
  }
`

const CancelButton = styled.button`
  height: 50px;
  background-color: #202020;
  box-shadow: 10px 10px 5px 0 rgba(0, 0, 0, 0.75);
  border: none;
  cursor: pointer;
  border-radius: 16px;
  color: coral;

  &:active {
    background-color: #181818;
  }
`
