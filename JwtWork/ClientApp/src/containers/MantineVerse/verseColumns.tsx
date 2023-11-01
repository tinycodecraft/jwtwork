/* eslint-disable camelcase */
import dayjs from "dayjs";
import type { MRT_ColumnDef } from "mantine-react-table";
import type { DataVerseItem } from "src/fragments/types";

export const verseColumns : MRT_ColumnDef<DataVerseItem>[]= [
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
        header: 'Published Date',
        Cell: ({cell}) => {
            const datevalue = cell.getValue<Date>();
            console.log(`date value is :`,datevalue)
            if(datevalue)
                return dayjs(datevalue).format('YYYY-MM-DD');
            return '';

        },
    }

];