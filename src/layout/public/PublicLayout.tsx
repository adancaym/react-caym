import styled from "styled-components";
import { Outlet } from 'react-router-dom';

const Grid = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  transition: width 1s;
`

const Nav = styled.div`
  height: 5vh;
`



export const PublicLayout = () => {
  return (
    <Grid>
      <Nav />
      <Outlet />
    </Grid >
  );

}
