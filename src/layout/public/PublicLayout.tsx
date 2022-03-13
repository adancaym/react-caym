import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  transition: width 1s;
`

const Nav = styled.div`
  height: 5vh;
`

interface MainProps {
    children: JSX.Element
}


export const PublicLayout = ({children}: MainProps) => {
    return (
        <Grid>
            <Nav/>
            {children}
        </Grid>
    );

}
