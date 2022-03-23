import {useSelector} from "react-redux";
import {StateApp} from "../../../redux/Types";
import {useEffect, useState} from "react";
import * as React from "react";
import styled from "styled-components";
import {LinkProps, NavLink, useMatch, useResolvedPath} from 'react-router-dom'
import {MatchProps, NavigationProps, ShowProps} from "./types";


export const NavigationItem = styled.li<NavigationItemLinkRouterStyleProps>`
  display: grid;
  grid-template: "icono nav-item-route" 50px / 60px 1fr;
  align-items: center;
  justify-items: center;
  background: ${({match}) => match ? 'white' : 'black'};
  position: relative;
  border-radius: 15px 0 0 15px;
`;
const BorderUp = styled.p<MatchProps>`
  position: absolute;
  top: -20px;
  height: 20px;
  width: 100%;
  background-color: white;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    border-bottom-right-radius: 25px;
  }
`
const BorderDown = styled.p<MatchProps>`
  position: absolute;
  bottom: -20px;
  height: 20px;
  width: 100%;
  background-color: white;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    border-top-right-radius: 25px;
  }
`
export const NavigationItemDropDownMenuContainer = styled.div<ShowProps>`
  grid-area: drop-down-trigger;
  display: grid;
  grid-template: ${({show}) => show ? '"icono-menu nav-item-link icono" 50px / 1fr 1fr 1fr' : '"icono-menu" 50px / 1fr'};
  align-items: center;
  justify-items: center;
`;
export const NavigationItemDropDownMenu = styled.li`
  display: grid;
  grid-template:  "drop-down-trigger" 50px "navigation" min-content / 1fr;
  gap: 1em;
`;

interface NavigationItemLinkRouterStyleProps extends MatchProps, ShowProps {
}

export const NavigationItemLinkRouterStyle = styled(NavLink)<NavigationItemLinkRouterStyleProps>`
  grid-area: nav-item-route;
  opacity: ${({show}) => show ? 1 : 0};
  display: ${({show}) => show ? 'grid' : 'none'};
  transition: all 300ms ease;
  color: ${({match}) => match ? 'black' : 'white'};
  width: 100%;
  height: 50px;
  justify-items: center;
  align-items: center;
  text-decoration: none;
`;

interface NavigationItemLinkRouterProps extends MatchProps, ShowProps, LinkProps {
}

const NavigationItemLinkRouter = ({to, match, children, ...rest}: NavigationItemLinkRouterProps) => {
    return (
        <NavigationItemLinkRouterStyle
            match={match}
            to={to}
            {...rest}
        >
            {children}
        </NavigationItemLinkRouterStyle>
    )
}

export const NavigationItemLink = styled.a<ShowProps>`
  grid-area: nav-item-link;
  opacity: ${({show}) => show ? 1 : 0};
  display: ${({show}) => show ? 'initial' : 'none'};
  transition: all 300ms ease;
  cursor: pointer;
`;
export const Icon = styled.i<ShowProps>`
  grid-area: icono;
  font-size: 50px;
  cursor: pointer;
  padding: 0 20px;
  border-radius: 16px;
  &:hover {
    background-color: white;
    color: black;
  }
  transition: background-color 1s ease;
`;
export const IconLink = styled(Icon)<NavigationItemLinkRouterStyleProps>`
  grid-area: icono;
  position: absolute;
  left: ${({show}) => show ? '0' : 'calc(50% - 45px)'};
  transform: ${({show}) => show ? 'translateX(-50 %)' : 'translateX(0)'};
  transition: all 300ms ease;
  color: ${({match = false}) => match ? 'black' : 'white'};
`;
export const IconDropDown = styled(Icon)<ShowProps>`
  grid-area: icono;
  font-size: 50px;
  opacity: ${({show}) => show ? 1 : 0};
  display: ${({show}) => show ? 'initial' : 'none'};
  transition: all 300ms ease;
  cursor: pointer;
`;
export const IconMenu = styled(Icon)<ShowProps>`
  grid-area: icono-menu;
  position: absolute;
  left: ${({show}) => show ? '0' : 'calc(50% - 45px)'};
  transform: ${({show}) => show ? 'translateX(-50 %)' : 'translateX(0)'};
  transition: all 300ms ease;
  cursor: pointer;
`;
export const Navigation = styled.ul<NavigationProps>`
  display: grid;
  grid-area: navigation;
  width: 100%;
  gap: 1em;
`;

export const Menu = ({menu, submenu = false}: any) => {
    return menu.menus.length > 0 ? (
        <Submenu menu={menu}/>
    ) : (
        <LinkMenu submenu={submenu} menu={menu}/>
    );
};
export const LinkMenu = ({menu}: any) => {
    const show = useSelector((state: StateApp) => state.ui?.sidebar.show) || false;
    let resolved = useResolvedPath(menu.path);
    let match = useMatch({path: resolved.pathname, end: true});
    return (
        <NavigationItem match={!!match} show={show}>
            {!!match &&
                <>
                    <BorderUp match={!!match}/>
                    <BorderDown match={!!match}/>
                </>
            }
            <IconLink match={!!match} show={show} className={menu.icon}/>
            <NavigationItemLinkRouter match={!!match} to={menu.path} show={show}>{menu.name}</NavigationItemLinkRouter>
        </NavigationItem>
    );
};
export const Submenu = ({menu}: any) => {
    const show =
        useSelector((state: StateApp) => state.ui?.sidebar.show) || false;
    const {menus} = menu;
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setDisplay(show && display)
    }, [show, display])
    return (
        <NavigationItemDropDownMenu>
            <NavigationItemDropDownMenuContainer
                show={show}
                onClick={() => setDisplay(!display)}
            >
                <IconMenu show={show} className={menu.icon}/>
                <NavigationItemLink show={show}>{menu.name}</NavigationItemLink>
                <IconDropDown show={show} className={display ? 'bx bx-chevron-up' : 'bx bx-chevron-right'}/>
            </NavigationItemDropDownMenuContainer>
            {display &&
                <Navigation submenu={true} show={show}>
                    {menus.map((menu: any, index: number) => (
                        <Menu key={index} menu={menu} submenu={true}/>
                    ))}
                </Navigation>
            }
        </NavigationItemDropDownMenu>
    );
};
