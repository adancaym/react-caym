import {useSelector} from "react-redux";
import {Navigate, Outlet} from 'react-router-dom';
import styled from "styled-components";

import {StateApp} from "../../redux/Types";
import {SideBar} from "./sidebar/SideBar";

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
  transition: all 0.5s ease;
  gap: 1em;
  padding: 0 1em;

`;

export const DashboardLayout = () => {

    const auth = useSelector((state: StateApp) => state.auth)
    if (!auth || (auth && !auth.token)) return <Navigate to={'/'}/>

    return (
        <Grid>
            <SideBar/>
            <Content>
                <Outlet/>
            </Content>
        </Grid>
    );
};
