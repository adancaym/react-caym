import styled from "styled-components";

export interface ArrayObjectReducerProps<T> {
    array: Array<T>
}
export const ArrayObjectReducer = <T extends { name: string }>({array}: ArrayObjectReducerProps<T>) => {
    return array.length > 0 ? <SelectTable>{array.map(e => <option key={e.name} value={e.name}>{e.name}</option>)} </SelectTable> :
        <p>Sin elementos</p>
}
export interface DateReducerProps {
    date: Date
}
export const DateReducer = ({date}: DateReducerProps) =>{
    return <p>{date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
}


const SelectTable = styled.select `
  width: 100%;
  border: none;
  background: transparent;
  color: black;

  &:active {
    outline: none;
  }

  &:focus {
    outline: none;
  }

  option {
    color: black;
  }
`
