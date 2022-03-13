import {Controller} from "../api/core/Controller";
import {useEffect, useState} from "react";
import {FieldEntityHtmlHelper} from "../api/core/EntityHtmlHelper";
import styled from "styled-components";
import {CrudProps} from "./Crud";


const GridTable = styled.div`
  grid-area: component-table;
  display: grid;
  gap: 1em;
  grid-template:
          "filter" 50px
          "tabla"  auto
          "pagination" min-content /
          auto;
`

const Filters = styled.div`
  grid-area: filter;
  display: grid;
  grid-template: "search-input search-button" / 90% 10%;
  justify-items: end;
`
const TableStyle = styled.table`
  grid-area: tabla;
  table-layout: fixed;
  background-color: #202020;
  border: 1px solid #202020;
  border-radius: 16px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
`
const PaginationStyle = styled.div`
  grid-area: pagination;
  justify-self: center;
  display: grid;
  background-color: #202020;
  border: 1px solid #202020;
  border-radius: 16px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  gap: 1em;
  grid-template: "pagination-button-prev pagination-info pagination-button-next" 1fr;
`
const ButtonPaginationNext = styled.button`
  grid-area: pagination-button-next;
  min-width: 50px;
  width: 50px;
  height: 50px;
  max-width: 50px;
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-self: end;
  color: #DDDDDD;
  padding: 0 .5em;
  border-radius: 16px;
  font-size: 24px;
  border: none;
  background-color: #202020;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);

  &:focus {
    border: none;
    outline: none;
  }

  &:disabled {
    background-color: #DDDDDD;
    color: #181818;
  }
`
const ButtonPaginationPrev = styled.button`
  grid-area: pagination-button-prev;
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
  min-width: 50px;
  width: 50px;
  height: 50px;
  max-width: 50px;
  color: #DDDDDD;
  padding: 0 .5em;
  justify-self: start;
  border-radius: 16px;
  font-size: 24px;
  border: none;
  background-color: #202020;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);

  &:focus {
    border: none;
    outline: none;
  }

  &:disabled {
    background-color: #DDDDDD;
    color: #181818;
  }
`

const PaginationInfo = styled.span`
  display: grid;
  grid-area: pagination-info;
  height: 50px;
  gap: 1em;
  justify-items: center;
  align-content: center;
  align-items: center;
  grid-template: "pagination-info-total-rows  pagination-info-current-page  pagination-info-total-pages" 1fr
`
const PaginationInfoTotalRow = styled.span`
  grid-area: pagination-info-total-rows;
`
const PaginationInfoCurrenPage = styled.span`
  grid-area: pagination-info-current-page;
`
const PaginationInfoTotalPages = styled.span`
  grid-area: pagination-info-total-pages;
`


const SearchInput = styled.input`
  grid-area: search-input;
  justify-self: start;
  width: 95%;
  color: #DDDDDD;
  padding: 0 .5em;
  border-radius: 16px;
  font-size: 24px;
  border: none;
  background-color: #202020;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);

  &:focus {
    border: none;
    outline: none;
  }
`
const SearchButton = styled.button`
  grid-area: search-button;
  width: 80px;
  border-radius: 16px;
  border: none;
  font-size: 20px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  background-color: #202020;
  outline: none;
  color: #DDDDDD;
  cursor: pointer;
`

const TrStyle = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
  &:nth-child(even) {
    background-color: #181818;
  }
`
const TheadStyle = styled.thead`
  font-size: 18px;
  text-align: center;
  display: table;
  width: 100%;
  table-layout: fixed; /* even columns width , fix width of table too*/
`
const TbodyStyle = styled.tbody`
  font-size: 18px;
  text-align: center;
  display: block;
  max-height: 300px;
  min-height: 300px;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`


export const Table = <S extends Controller<R, E>, R, E>({controller}: CrudProps<S, R, E>) => {
    const [rows, setRows] = useState<Array<R>>([])
    const [q, setQ] = useState('');
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const fetchData = () => {
        controller.list<R>().then(r => {
            setRows(r.rows)
            setTotal(r.count);
            setTotalPages(parseInt((1 + (r.count / controller.pagination.limit)).toString()))
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (q !== '') controller.pagination.q = q;
        else controller.pagination.q = undefined;
    }, [q])

    const searchKeyword = (keyword: string) => {
        if (keyword !== '') {
            controller.pagination.q = keyword;
        } else {
            controller.pagination.q = undefined;
        }
        setQ(keyword)
        fetchData();
    }

    const renderProp = (object: R, {key, reducer}: FieldEntityHtmlHelper<R>) => {
        const mapped = Object.entries(object).map(([key, value]) => ({key, value})).find(object => object.key === key);
        if (reducer) return reducer(object);
        if (mapped) return mapped.value;
    }

    const page = (value: number) => {
        controller.pagination.page = controller.pagination.page + value;
        fetchData();
    }
    return (
        <GridTable>
            <Filters>
                <SearchInput placeholder={'Search'} type="text" onChange={({target}) => searchKeyword(target.value)}/>
                <SearchButton className='bx bx-search-alt-2' onClick={() => fetchData()}/>
            </Filters>
            <TableStyle>
                <TheadStyle>
                    <TrStyle>
                        <th style={{width:'10px'}}>N</th>
                        {controller.table.fields.map((field, index) => <th
                            key={`${field.key} ${index}`}>{field.label}</th>)}
                    </TrStyle>
                </TheadStyle>
                <TbodyStyle>
                    {rows.length === 0 && <TrStyle>
                        <td colSpan={controller.table.fields.length}>Sin datos</td>
                    </TrStyle>}
                    {rows.map((object, index) => <TrStyle key={index}>
                        <td style={{width:'10px'}}>{index + 1}</td>
                        {controller.table.fields.map((field, index) => <td key={`${field.key} row ${index}`}>
                            {renderProp(object, field)}
                        </td>)}
                    </TrStyle>)}
                </TbodyStyle>
            </TableStyle>
            <PaginationStyle>
                <ButtonPaginationPrev disabled={controller.pagination.page <= 1}
                                      onClick={() => page(-1)}>{'<'}</ButtonPaginationPrev>
                <PaginationInfo>
                    <PaginationInfoTotalRow>Total: {total}</PaginationInfoTotalRow>
                    <PaginationInfoCurrenPage>Página: {controller.pagination.page}</PaginationInfoCurrenPage>
                    <PaginationInfoTotalPages>Total de páginas: {totalPages}</PaginationInfoTotalPages>
                </PaginationInfo>
                <ButtonPaginationNext disabled={controller.pagination.page >= totalPages}
                                      onClick={() => page(1)}>{'>'}</ButtonPaginationNext>
            </PaginationStyle>
        </GridTable>

    );
}
