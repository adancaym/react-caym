
export interface ArrayObjectReducerProps<T> {
    array: Array<T>
}
export const ArrayObjectReducer = <T extends { name: string }>({array}: ArrayObjectReducerProps<T>) => {
    return array.length > 0 ? <select>{array.map(e => <option key={e.name} value={e.name}>{e.name}</option>)} </select> :
        <p>Sin elementos</p>
}
export interface DateReducerProps {
    date: Date
}
export const DateReducer = ({date}: DateReducerProps) =>{
    return <p>{date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
}
