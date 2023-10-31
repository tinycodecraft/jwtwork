/* eslint-disable camelcase */
import React, { type UIEvent, useCallback, useContext, useEffect, useMemo } from 'react'
import { useParams } from 'react-router'
import { DataVerseStateInit } from 'src/config'
import { type DataVerseState } from 'src/fragments/types'
import { useAppSelector, useAppDispatch } from 'src/store'
import { getDataVerseAsync } from 'src/store/verseSlice'
import verseDataContext from 'src/context/VerseDataContext'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { verseColumns } from './verseColumns'
import { Text } from '@mantine/core'

export const VerseDataForm = () => {
  const {
    data,
    fetchNextPage,
    filtering,
    globalFilter,
    isError,
    isFetching,
    ref,
    rowRef,

    isLoading,
    setFiltering,
    setGlobalFilter,
    setSorting,
    sorting,
  } = useContext(verseDataContext)

  const flatData = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data])

  const totalDBRowCount = data?.pages?.[0]?.total_count ?? 0
  const totalFetched = flatData.length

  // called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        // once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
        if (scrollHeight - scrollTop - clientHeight < 400 && !isFetching && totalFetched < totalDBRowCount) {
          fetchNextPage && fetchNextPage()
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
  )

  // scroll to top of table when sorting or filters change
  useEffect(() => {
    if (rowRef) {
      if (rowRef.current) {
        try {
          rowRef.current.scrollToIndex(0)
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [sorting, filtering, globalFilter, rowRef])

  // a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    if (ref) {
      fetchMoreOnBottomReached(ref.current)
    }
  }, [fetchMoreOnBottomReached, ref])

  const table = useMantineReactTable({
    columns: verseColumns,
    data: flatData,
    enablePagination: false,
    enableRowNumbers: true,
    enableRowVirtualization: true, // optional, but recommended if it is likely going to be more than 100 rows
    manualFiltering: true,
    manualSorting: true,
    mantineTableContainerProps: {
      ref, // get access to the table container element
      sx: { maxHeight: '600px' }, // give the table a max height
      onScroll: (
        event: UIEvent<HTMLDivElement>, // add an event listener to the table container element
      ) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
    },
    mantineToolbarAlertBannerProps: {
      color: 'red',
      children: 'Error loading data',
    },
    onColumnFiltersChange: setFiltering,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    renderBottomToolbarCustomActions: () => (
      <Text>
        Fetched {totalFetched} of {totalDBRowCount} total rows.
      </Text>
    ),
    state: {
      columnFilters: filtering,
      globalFilter,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      sorting,
    },
    rowVirtualizerInstanceRef: rowRef, // get access to the virtualizer instance
    rowVirtualizerProps: { overscan: 10 },
  })

  return <MantineReactTable table={table} />
}
