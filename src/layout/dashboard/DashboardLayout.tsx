import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet} from 'react-router-dom';
import styled from "styled-components";

import {StateApp} from "../../redux/Types";
import {SideBar} from "./SideBar";

const Grid = styled.div`
  display: grid;
  grid-template: "sidebar content-render";
  transition: all 0.5s ease;
  gap: 1em;
  overflow: auto;
`;
const Content = styled.div`
  display: grid;
  grid-area: content-render;
  padding: 1em;
  grid-template:
    "nav-content" min-content
    "container-content" min-content
    "console" min-content /
    1fr;
  transition: all 0.5s ease;

`;
const Nav = styled.div`
  grid-area: nav-content;
`;
const Container = styled.div`
  grid-area: container-content;
`;
const ConsoleStyle = styled.div`
  grid-area: console;
  background-color: black;
  overflow-y: scroll;
  padding: 0 3em;
  color: chartreuse;
  max-height: 200px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Console = () => {
    const [logs, setLogs] = useState<Array<string>>([]);

    const ui = useSelector(({ui}: StateApp) => ui);

    useEffect(()=> {
        if (ui && ui.logs) setLogs(ui.logs)
    },[])

    const token = useSelector(({auth}: StateApp) => auth?.token);
    if (!logs) return <ConsoleStyle/>;
    return (
        <ConsoleStyle>
            <p>{token}</p>
            <br/>
            {logs
                .slice()
                .reverse()
                .map((log, index) => (
                    <p key={index}>-- {log}</p>
                ))}
        </ConsoleStyle>
    );
};
export const DashboardLayout = () => {

    const auth = useSelector((state: StateApp) => state.auth)
    if (!auth || (auth && !auth.token)) return <Navigate to={'/'}/>

    return (
        <Grid>
            <SideBar/>
            <Content>
                <Nav>
                    <h1>Holi</h1>
                </Nav>
                <Container>
                    <Outlet/>
                </Container>
                <Console/>
            </Content>
        </Grid>
    );
};
