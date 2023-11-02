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
        id:'published_at',
        header: 'Published Date',
        // even filterFn provided, the filter will not be used for manual filtering enabled. (server data)
        filterFn: (row,_colIds,filtervalue,meta)=> {
            // console.log(`the value here `,filtervalue,` with `,meta)
            const datevalue = row.getValue<Date>('published_at');
            const datestring = dayjs(datevalue ).format('YYYYMMDD');
            let lowervalue = '19000101';
            let uppervalue = '39990101';
            if(filtervalue && filtervalue instanceof Array)
            {
                if(filtervalue.length >1)
                {
                    lowervalue= dayjs( filtervalue[0]).format('YYYYMMDD');
                    uppervalue= dayjs( filtervalue[1]).format('YYYYMMDD');
                }
            }
            else {
                lowervalue =  dayjs( filtervalue).format('YYYYMMDD');
            }
            
            return datestring >=lowervalue && datestring< uppervalue;

        },
        filterVariant: 'date-range',
        Cell: ({cell}) => {
            const datevalue = cell.getValue<Date>();
            
            if(datevalue)
                return dayjs(datevalue).format('DD/MM/YYYY');
            return '';

        },
    }

];