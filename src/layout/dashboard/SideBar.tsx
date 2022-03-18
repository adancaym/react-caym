import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";

import {logout} from "../../redux/reducers/auth/actionsAuth";
import {hideSideBar, showSideBar} from "../../redux/reducers/ui/actionsUi";
import {StateApp} from "../../redux/Types";
import {Link} from 'react-router-dom'
import * as React from "react";
interface ShowProps {
    show: boolean;
}

interface NavigationProps extends ShowProps {
    submenu?: boolean;
}

const Nav = styled.nav`
  display: grid;
  grid-area: sidebar;
  min-width: ${({show = false}: ShowProps) => (show ? "340px" : "100px")};
  height: 100vh;
  max-height: 100vh;
  gap: 1em;
  transition: all 0.5s ease;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
`;
const Navigation = styled.ul`
  min-width: ${({show = false}: NavigationProps) =>
          show ? "min-content" : "100%"};
  display: ${({show = false, submenu = false}: NavigationProps) =>
          show ? "grid" : submenu ? "none" : "grid"};
  overflow-y: auto;
  ${({submenu}: NavigationProps) => (submenu ? "margin: 0 0 1em 5px" : "")};
  justify-items: ${({show}: NavigationProps) => (show ? "start" : "center")};
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;
const NavigationItem = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: ${({show = false}: ShowProps) =>
          show ? "2fr 4fr" : "auto"};
  align-items: center;
  justify-items: ${({show}: ShowProps) => (show ? "start" : "center")};
  transition: all 0.5s ease;
  gap: 0.5em;
  margin: 1em 0;
`;
const NavigationItemDropDownMenuContainer = styled.div`
  display: grid;
  grid-template-columns: ${({show = false}: ShowProps) =>
          show ? "3fr 4fr 2fr" : "auto"};
  justify-items: ${({show}: ShowProps) => (show ? "start" : "center")};
  align-items: center;
  gap: 1em;
  transition: all 0.5s ease;

`;

const NavigationItemDropDownMenu = styled.li`
  width: 100%;
  margin: 1.5em 0;
  list-style: none;
`;

const NavigationItemLinkRouter = styled(Link)<ShowProps>`
  opacity: ${({show = false}) => (show ? "1" : "0")};
  display: ${({show = false}) => (show ? "block" : "none")};
  transition: all 0.5s ease;
`;

const NavigationItemLink = styled.a<ShowProps>`
  opacity: ${({show = false}) => (show ? "1" : "0")};
  display: ${({show = false}) => (show ? "block" : "none")};
  transition: all 0.5s ease;
`;

const NavHeader = styled.ul`
  width: 100%;
  padding: 1em 0;
  display: grid;
  grid-template-columns: ${({show = false}: ShowProps) =>
          show ? "4fr 2fr" : "auto"};
  justify-items: start;
  align-items: center;
  transition: all 0.5s ease;
`;
const NavHeaderItem = styled.li`
  display: ${({show = false}: ShowProps) => (show ? "block" : "none")};
  width: 100%;
  text-align: center;
  list-style: none;
  transition: all 0.5s ease;
`;
const NavHeaderItemLogo = styled.li`
  width: 100%;
  text-align: center;
  list-style: none;
`;

const Logo = styled.i`
  font-size: 2em;
  align-self: center;
  justify-self: center;
`;
const Icon = styled.i`
  margin-left: ${({show = false}: ShowProps) => (show ? "10px" : "0")};
  font-size: 2em;
  cursor: pointer;
  transition: all 0.5s ease;
`;
const Img = styled.img`
  border-radius: 16px;
  width: 100px;
  height: 100px;
  align-self: center;
  justify-self: center;
`;
export const SideBar = () => {
    const dispatch = useDispatch();
    const show =
        useSelector((state: StateApp) => state.ui?.sidebar.show) || false;
    const user = useSelector((state: StateApp) => state.auth?.user);

    if (!user) return <></>;

    const {name, email, picture} = user;

    const display = () => dispatch(showSideBar());
    const hide = () => dispatch(hideSideBar());
    return (
        <Nav show={show}>
            <NavHeader show={show}>
                <NavHeaderItem show={show}>{name}</NavHeaderItem>
                <NavHeaderItemLogo>
                    <Icon
                        show={show}
                        onClick={() => (show ? hide() : display())}
                        className="bx bx-menu"
                    />
                </NavHeaderItemLogo>
            </NavHeader>
            <Logo className="bx bxl-trip-advisor"/>
            <Img src={picture} alt=""/>
            <NavHeader show={show}>
                <NavHeaderItem show={show}>{email}</NavHeaderItem>
                <NavHeaderItemLogo>
                    <Icon
                        onClick={() => dispatch(logout())}
                        show={show}
                        className="bx bx-log-out-circle"
                    />
                </NavHeaderItemLogo>
            </NavHeader>
            <Navigation show={show} submenu={false} onClick={() => display()}>
                {user.groups.map((menu, index) => (
                    <Menu key={index} menu={menu}/>
                ))}
            </Navigation>
        </Nav>
    );
};

const Menu = ({menu, submenu = false}: any) => {
    return menu.menus.length > 0 ? (
        <Submenu menu={menu}/>
    ) : (
        <LinkMenu submenu={submenu} menu={menu}/>
    );
};

const LinkMenu = ({menu}: any) => {
    const show = useSelector((state: StateApp) => state.ui?.sidebar.show) || false;
    return (
        <NavigationItem show={show}>
            <Icon show={show} className={menu.icon}/>
            <NavigationItemLinkRouter to={menu.path} show={show}>{menu.name}</NavigationItemLinkRouter>
        </NavigationItem>
    );
};
const Submenu = ({menu}: any) => {
    const show =
        useSelector((state: StateApp) => state.ui?.sidebar.show) || false;
    const {menus} = menu;
    const [display, setDisplay] = useState(false);
    return (
        <NavigationItemDropDownMenu>
            <NavigationItemDropDownMenuContainer
                show={show}
                onClick={() => setDisplay(!display)}
            >
                <Icon show={show} className={menu.icon}/>
                <NavigationItemLink show={show}>{menu.name}</NavigationItemLink>

                {show && (
                    <>
                        {display ? (
                            <Icon show={show} className="bx bx-chevron-up"/>
                        ) : (
                            <Icon show={show} className="bx bx-chevron-right"/>
                        )}
                    </>
                )}
            </NavigationItemDropDownMenuContainer>
            {display && (
                <Navigation submenu={true} show={show}>
                    {menus.map((menu: any, index: number) => (
                        <Menu key={index} menu={menu} submenu={true}/>
                    ))}
                </Navigation>
            )}
        </NavigationItemDropDownMenu>
    );
};
