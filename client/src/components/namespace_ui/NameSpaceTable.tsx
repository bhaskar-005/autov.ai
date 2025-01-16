import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { DataTable } from '../ui/data-table';
import { LucideEdit, MoreHorizontal, TimerIcon, TimerResetIcon, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

type NameSpace = {
  id: number;
  groupName: string;
  groupDescription : string;
  createdAt: string;
}

type NameSpacePropType ={
  NameSpaceData: NameSpace[];
  onAddHandler: (id: number) => void;
  onEditHandler: (id: number) => void;
  onDeleteHandler: (id: number) => void;
}
const NameSpaceTable = ({NameSpaceData, onAddHandler, onDeleteHandler, onEditHandler}:NameSpacePropType) => {

  const NameSpaceActions = [
    {
      name: "Edit",
      icon: LucideEdit,
      handler: onEditHandler,
      destructive: false,
    },
    {
      name: "delete",
      icon: Trash2,
      handler: onDeleteHandler,
      destructive: true,
    },
   ]

   const columns: ColumnDef<NameSpace>[] = [
        {
          accessorKey: "groupName",
          header: "Group Name",
          cell: ({row})=>(
            <div className='text-gray-900 font-samibold text-sm mx-4'>
              {row.getValue("groupName")}
            </div>
          )
        },
        {
          accessorKey: "groupDescription",
          header: "Group Description",
        },
         {
          accessorKey: "updatedAt",
          header: "Updated At",
          cell:({row})=>{
            const Time = new Date(row.getValue('updatedAt')).toLocaleString();
            return (
              <div className="flex items-center gap-2 ">
                 <TimerResetIcon className="w-[16px]"/>
                 <div className="text-sm font-medium">
                 {Time}
                 </div>
              </div>
            )
           }
        }, {
          accessorKey: "createdAt",
          header: "Created At",
          cell:({row})=>{
            const Time = new Date(row.getValue('createdAt')).toLocaleString();
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
          accessorKey: "addbutton",
          header: "",
          cell:({row})=>{
           return <Button onClick={()=>onAddHandler(row.original.id)}>
              Add channal
            </Button>
          }
        },
        {
          accessorKey: 'actions',
          header: '',
          cell: ({ row }) => {
            const id = row.original.id;
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                {
                  NameSpaceActions.map((action)=>(
                  <DropdownMenuItem
                   onClick={()=> action.handler(id)}
                   className={`${action.destructive?"bg-red-700/30":""}`}>
                   {action.name} 
                  </DropdownMenuItem>
                  ))
                }
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        }, 
      ]


  return (
    <DataTable columns={columns} data={NameSpaceData}/>
  );
}

export default NameSpaceTable;
