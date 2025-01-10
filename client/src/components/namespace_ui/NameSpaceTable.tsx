import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { DataTable } from '../ui/data-table';
import { TimerIcon } from 'lucide-react';
import { Button } from '../ui/button';

type NameSpace = {
  id: number;
  name: string;
  accounts: string;
  description: string;
  createdAt: string;
}
const NameSpaceTable = ({NameSpaceData, onAddHandler}:{NameSpaceData:NameSpace[], onAddHandler:Function}) => {
    const columns: ColumnDef<NameSpace>[] = [
        {
          accessorKey: "name",
          header: "Name",
          cell: ({row})=>(
            <div className='text-gray-900 font-samibold text-sm mx-4'>
              {row.getValue("name")}
            </div>
          )
        },
        {
          accessorKey: "accounts",
          header: "Added Accounts",
        },
        {
          accessorKey: "description",
          header: "Description",
        },
        {
          accessorKey: "createdAt",
          header: "Created At",
          cell:({row})=>{
            const Time = new Date(row.getValue('createdAt')).toLocaleTimeString();
            return (
              <div className="flex items-center gap-2 ">
                 <TimerIcon className="w-[16px]"/>
                 <div className="text-sm font-medium">
                 {Time}
                 </div>
              </div>
            )
           }
        },
        {
          accessorKey: "actions",
          header: "",
          cell:({row})=>{
           return <Button onClick={()=>onAddHandler(row.original.id)}>
              Add channal
            </Button>
          }
        },
      ]


  return (
    <DataTable columns={columns} data={NameSpaceData}/>
  );
}

export default NameSpaceTable;
