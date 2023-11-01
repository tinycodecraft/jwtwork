/* eslint-disable camelcase */
import { useInfiniteQuery, type InfiniteData, type FetchNextPageOptions, type InfiniteQueryObserverResult } from '@tanstack/react-query'
import { MRT_Virtualizer, type MRT_ColumnFiltersState, type MRT_SortingState } from 'mantine-react-table'
import React, { createContext,  useState, type SetStateAction, useRef } from 'react'
import { VerseApi } from 'src/api'
import type {  DataVerseState } from 'src/fragments/types'

interface VerseDataContextProps {
  ref: React.MutableRefObject<HTMLDivElement | null>
  rowRef: React.MutableRefObject<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement> | null>
  data: InfiniteData<DataVerseState>
  isError: boolean
  isFetching: boolean
  isLoading: boolean
  filtering: MRT_ColumnFiltersState
  sorting: MRT_SortingState;
  globalFilter: string;
  setFiltering: (value:SetStateAction<MRT_ColumnFiltersState>) => void;
  setSorting: (value: SetStateAction<MRT_SortingState>) => void;
  setGlobalFilter: (value:SetStateAction<string|undefined>) => void;
  fetchNextPage: (options?: FetchNextPageOptions|undefined) => Promise<InfiniteQueryObserverResult<DataVerseState,unknown>>;
}

const VerseDataContext = createContext<Partial<VerseDataContextProps>>({})

export const VerseDataContextProvider = ({ children, fetchSize }: { children: React.ReactNode; fetchSize: number }) => {
  const tableRef = useRef<HTMLDivElement | null>(null)
  const rowRef = useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement> | null>(null)
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState<string>()
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const { data, fetchNextPage, isError, isFetching, isLoading } = useInfiniteQuery<DataVerseState>({
    queryKey: ['table-verse', columnFilters, globalFilter, sorting],
    getNextPageParam: (_lastGroup, groups) => groups.length,
    queryFn: async ({ pageParam = 0 }) => {
      console.log(`the true filter values `, columnFilters);
      const response = await VerseApi.getDataVerseAsync({
        start: pageParam * fetchSize,
        size: fetchSize,
        type: 'file',
        filtering: columnFilters,
        globalFilter,
        sorting,
      })
      return response
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })



  return (
    <VerseDataContext.Provider
      value={{
        data,
        isError,
        isFetching,
        isLoading,
        filtering: columnFilters,        
        sorting,
        setFiltering: setColumnFilters,
        setSorting,
        globalFilter,
        setGlobalFilter,
        ref: tableRef,
        rowRef,
        fetchNextPage,
      }}
    >
      {children}
    </VerseDataContext.Provider>
  )
}

export default VerseDataContext
