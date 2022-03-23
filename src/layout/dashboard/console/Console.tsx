import styled from "styled-components";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {StateApp} from "../../../redux/Types";

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
    },[ui])

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
