import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";

import {logout, me} from "../../../redux/reducers/auth/actionsAuth";
import {hideSideBar, showSideBar} from "../../../redux/reducers/ui/actionsUi";
import {StateApp} from "../../../redux/Types";
import * as React from "react";
import {Users} from "../../../api/backend/Users";
import {UserFull} from "../../../api/Types";
import {ShowProps} from "./types";
import {Icon, Menu, Navigation} from "./Menu";
import {Modal} from "../../../components/Modal";
import {Console} from "../console/Console";


const Nav = styled.nav<ShowProps>`
  display: grid;
  position: relative;
  grid-template: 
          '.'
          'nav-section-hamburger' 50px
          'nav-section-data' 50px
          'nav-section-refresh' 50px 
          'nav-section-dev-tools' 50px 
          'navigation' 1fr /
          1fr;
  min-height: 100vh;
  width: ${({show}) => show ? '250px' : '100px'};
  transition: all 300ms ease;
  background: black;
  color: white;
  gap: 1em;
`;


const NavSectionData = styled.div<ShowProps>`
  display: grid;
  grid-area: nav-section-data;
  grid-template: ${({show}) => show ? '"text icono"' : '"icono"'};
  justify-items: ${({show}) => show ? "end" : "center"};
  align-items: center;
`;
const NavSectionDataHamburger = styled.div<ShowProps>`
  display: grid;
  grid-area: nav-section-hamburger;
  grid-template: ${({show}) => show ? '"text icono"' : '"icono"'};
  justify-items: ${({show}) => show ? "end" : "center"};
  align-items: center;
`;
const NavSectionRefresh = styled.div<ShowProps>`
  display: grid;
  grid-area: nav-section-refresh;
  grid-template: ${({show}) => show ? '"text icono"' : '"icono"'};
  align-items: center;
  justify-items: ${({show}) => show ? "end" : "center"};
`;
const NavSectionConsole = styled.div<ShowProps>`
  display: grid;
  grid-area: nav-section-dev-tools;
  grid-template: ${({show}) => show ? '"text icono"' : '"icono"'};
  align-items: center;
  justify-items: ${({show}) => show ? "end" : "center"};
`;
const NavSectionText = styled.div<ShowProps>`
  grid-area: text;
  opacity: ${({show}) => show ? 1 : 0};
  display: ${({show}) => show ? 'initial' : 'none'};
  transition: all 300ms ease;
  text-align: left;
  justify-self: start;
  margin-left: 25px;

`;

export const SideBar = () => {

    const users = new Users();
    const dispatch = useDispatch();
    const show = useSelector((state: StateApp) => state.ui?.sidebar.show) || false;
    const user = useSelector((state: StateApp) => state.auth?.user);
    if (!user) return <></>;
    const {email} = user;
    const userMe = () => users.me().then((refresh));
    const refresh = (user: UserFull) => dispatch(me(user))
    const display = () => dispatch(showSideBar());
    const hide = () => dispatch(hideSideBar());

    return (
        <Nav show={show}>
            <NavSectionDataHamburger show={show}>
                <NavSectionText show={show}>{email}</NavSectionText>
                <Icon onClick={() => (show ? hide() : display())} show={show} className="bx bx-menu"/>
            </NavSectionDataHamburger>
            <NavSectionData show={show}>
                <NavSectionText show={show}>Cerrar sesión</NavSectionText>
                <Icon onClick={() => dispatch(logout())} show={show} className="bx bx-log-out-circle"/>
            </NavSectionData>
            <NavSectionRefresh show={show}>
                <NavSectionText show={show}>Refrescar sesión</NavSectionText>
                <Icon onClick={userMe} show={show} className="bx bx-refresh"/>
            </NavSectionRefresh>
            <NavSectionConsole show={show}>
                <NavSectionText show={show}>DevTools</NavSectionText>
                <Modal title={'Consola'} buttonTrigger={<Icon show={show} className="bx bxl-dev-to"/>}>
                    <Console/>
                </Modal>
            </NavSectionConsole>
            <Navigation show={show} submenu={false} onClick={() => display()}>
                {user.groups.map((menu, index) => (
                    <Menu key={index} menu={menu}/>
                ))}
            </Navigation>
        </Nav>
    );
};

