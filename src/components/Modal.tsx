import { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import {Button, ButtonDanger, ButtonPrimary} from "./common/Button";

const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: 100vh;
  background-color: rgba(20, 20, 20, 0.8);
`;
const ModalContainer = styled.div`
  display: grid;
  position: fixed;
  top: 20%;
  left: 15%;
  width: 70%;
  background-color:  white;
  box-shadow: 0px 6px 33px 21px rgba(0, 0, 0, 0.75);
  min-height: 500px;
  padding: 2em;
  border-radius: 16px;
  grid-template:
    "ModalHeader" 50px
    "ModalContent" auto
    "ModalFooter" 50px
    "ModalActions" min-content;
  gap: 1em;
`;

const ModalHeader = styled.div`
  display: grid;
  grid-area: ModalHeader;
  grid-template: "ModalHeaderTitle ModalHeaderButtonClose" 1fr / 1fr 50px;
`;
const ModalContent = styled.div`
  grid-area: ModalContent;
  width: 100%;
  display: grid;
  justify-self: center;
  align-items: center;
  max-height: 400px;
  overflow: auto;
`;
const ModalFooter = styled.div`
  grid-area: ModalFooter;
`;
const ModalActions = styled.div`
  grid-area: ModalActions;
  display: grid;
  gap: 1em;
  grid-template-columns: 10% 10%;
  align-items: end;
  justify-content: end;
`;
const ModalHeaderTitle = styled.h1`
  grid-area: ModalHeaderTitle;
  align-self: center;
  justify-self: center;
`;
export interface ModalProps {
  children?: JSX.Element | JSX.Element[];
  title: string;
  buttonText?: string;
  buttonTrigger?: JSX.Element;
  onCancel?: () => void;
  onAccept?: () => void;
  onClose?: () => void;
  footer?: JSX.Element | JSX.Element[];
  showModalActions?: boolean;
}

export const Modal = forwardRef(
  (
    {
      children,
      title,
      footer,
      buttonText,
      buttonTrigger,
      onAccept,
      onCancel,
      onClose,
      showModalActions = true
    }: ModalProps,
    ref
  ) => {
    const [display, setDisplay] = useState(false);

    const clickOpen = () => {
      setDisplay(true);
    };
    const clickClose = () => {
      setDisplay(false);
      if (onClose) onClose();
    };
    const clickAccept = () => {
      setDisplay(false);
      if (onAccept) onAccept();
    };
    const clickCancel = () => {
      setDisplay(false);
      if (onCancel) onCancel();
    };
    useImperativeHandle(ref, () => ({
      clickOpen() {
        clickOpen();
      },
      clickClose() {
        clickClose();
      },
      clickAccept() {
        clickAccept();
      },
      clickCancel() {
        clickCancel();
      },
    }));

    return (
      <div>
        {buttonTrigger ? <div onClick={clickOpen}>{buttonTrigger}</div> : <button onClick={clickOpen}>{buttonText}</button>}
        {display && (
          <ModalBackDrop>
            <ModalContainer>
              <ModalHeader>
                <ModalHeaderTitle>{title}</ModalHeaderTitle>
                <Button onClick={clickClose}>
                  X
                </Button>
              </ModalHeader>
              <ModalContent>{children}</ModalContent>
              {footer ? <ModalFooter>{footer}</ModalFooter> : <></>}
              {showModalActions && <ModalActions>
                <ButtonDanger onClick={clickCancel}>Cancelar</ButtonDanger>
                <ButtonPrimary onClick={clickAccept}>Aceptar</ButtonPrimary>
              </ModalActions>}
            </ModalContainer>
          </ModalBackDrop>
        )}
      </div>
    );
  }
);
