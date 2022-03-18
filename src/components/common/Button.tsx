import styled from "styled-components";

export const Button = styled.button`
  padding: 10px;
  align-self: end;
  justify-self: end;
  border-radius: 6px;
  background: none;
  display: inline-block;
  &:disabled {
    background: darkgrey;
    color: white;
    outline-color: white;
    border-color: white;
  }
`;
export const ButtonPrimary = styled(Button)`
  color: darkblue;
  outline-color: darkblue;
  border-color: darkblue;
`;
export const ButtonDanger = styled(Button)`
  color: coral;
  outline-color: coral;
  border-color: coral;
`;

