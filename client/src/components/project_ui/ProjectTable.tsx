import React from "react";
import { Button } from "@/components/ui/button"; // shadcn button
import { DataTable } from "../ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { TimerIcon } from "lucide-react";

export type Project = {
  id: number;
  name: string;
  image: string;
  status: string;
  description: string;
  namespace: string;
  triggerTime: string;
};

type ProjectTableProps = {
  projects: Project[];
  onViewDetails: Function;
};

const ProjectTable = ({ projects, onViewDetails }:ProjectTableProps) => {
const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({row})=>(
      <div className="py-1 px-2">
        <img
          src={row.getValue("image")}
          alt={row.getValue("name")}
          className="w-18 h-14 object-cover rounded-md"
        />
      </div>
    )
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "namespace",
    header: "Name Space",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "triggerTime",
    header: "Trigger Time",
    cell:({row})=>{
      const Time = new Date(row.getValue('triggerTime')).toLocaleTimeString();
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
     return <Button onClick={()=>onViewDetails(row.original)}>
        view info
      </Button>
    }
  },
]


  return (
    <DataTable columns={columns} data={projects} />
  );
};

export default ProjectTable;
