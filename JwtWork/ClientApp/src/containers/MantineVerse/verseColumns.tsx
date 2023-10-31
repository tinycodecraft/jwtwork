/* eslint-disable camelcase */
import type { MRT_ColumnDef } from "mantine-react-table";
import type { DataVerseItem } from "src/fragments/types";

export const columns : MRT_ColumnDef<DataVerseItem>[]= [
    {
        accessorKey: 'name',
        header: 'File Name',
    },
    {
        accessorKey: 'file_type',
        header: 'File Type'
    },
    {
        accessorKey: 'description',
        header: 'Description',        
    },
    {
        accessorKey: 'published_at',
        header: 'Published Date'
    }

];