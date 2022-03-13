import styled from "styled-components";
import {SideBar} from "./SideBar";
import {useSelector} from "react-redux";
import {StateApp} from "../../redux/Types";

const Grid = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  transition: all 1s ease;
  gap: 1em;
`
const Content = styled.div`
  display: grid;
  grid-template-rows: 10vh auto 15vh;
  padding: 1em;
  gap: 2em;
`
const Nav = styled.div`
  background: #181818;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 16px;
`
const Container = styled.div`
  background: #181818;
  box-shadow: 10px 10px 5px 0 rgba(0, 0, 0, 0.75);
  border-radius: 16px;
  padding: 3em;
`
const ConsoleStyle = styled.div`
  background-color: black;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 16px;
  max-height: 15vh;
  overflow-y: scroll;
  padding: 2em;
  color: chartreuse;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar{
    display: none;
  }
`

interface MainProps {
    children: JSX.Element
}


export const Console = () => {
    const logs = useSelector(({ui}: StateApp) => ui?.logs);
    const token = useSelector(({auth}: StateApp) => auth?.token);
    if (!logs) return <ConsoleStyle/>
    return <ConsoleStyle>
        <p>{token}</p>
        {logs.slice().reverse().map((log, index) => <p key={index}>{log}</p>)}
    </ConsoleStyle>
}
export const DashboardLayout = ({children}: MainProps) => {

    return (
        <Grid>
            <SideBar/>
            <Content>
                <Nav/>
                <Container>
                    {children}
                </Container>
                <Console/>
            </Content>
        </Grid>
    );

}
