import React from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { 
  CheckCircle2, 
  XCircle,
  Clock,
  UploadCloud,
  ListTree
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectTableSkeleton } from "../skeleton_ui/project-skeleton";

export type ProjectType = {
  uploaderId: string;
  UploadName: string;
  uploadDescription?: string;
  videoUrl: string;
  isAutoGenerated: boolean;
  uploadDisplayImage: string;
  autoUpload: boolean;
  uploadTimeStamp: string;
  numberOfClips: true;
  groupId: number | string;
  socialAccountGroup: {
    groupName: string;
    groupDescription: string;
  };
  uploadStatus: string;
  speechLanguage: string;
};

type ProjectTableProps = {
  projects: ProjectType[];
  onViewDetails: (project: ProjectType) => void;
  isLoading?: boolean;
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'successful':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-800/40';
    case 'panding':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-800/40';
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-800/40';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-800/40';
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'successful':
      return <CheckCircle2 className="w-4 h-4" />;
    case 'panding':
      return <Clock className="w-4 h-4" />;
    case 'failed':
      return <XCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};


const ProjectTable = ({ projects, onViewDetails, isLoading }: ProjectTableProps) => {
  const columns: ColumnDef<ProjectType>[] = [
    {
      accessorKey: "uploadDisplayImage",
      header: "Preview",
      size: 150,
      cell: ({ row }) => (
        <div className="relative my-2 mx-2">
          <img
            src={row.getValue("uploadDisplayImage")}
            alt={row.getValue("UploadName")}
            className="w-full h-16 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          />
          {row.original.uploadStatus.toLowerCase() !== 'Sucess' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      )
    },
    {
      accessorKey: "UploadName",
      header: "Project Name",
      size: 260,
      cell: ({ row }) => (
        <div className="font-medium max-w-[230px] w-full">
          <div className="truncate text-base">
            {row.getValue("UploadName")}
          </div>
          <div className="truncate text-sm text-black/50" title={row.original.uploadDescription || " "}>
          {row.original.uploadDescription || ""}
        </div>
        </div>
      )
    },
    {
      accessorKey: "socialAccountGroup",
      header: "Namespace",
      size: 200,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <ListTree className="w-5"/>
          <span className="font-medium truncate max-w-[140px]">
            {row.original.socialAccountGroup.groupName}
          </span>
        </div>
      )
    },
    {
      accessorKey: "uploadStatus",
      header: "Status",
      size: 120,
      cell: ({ row }) => {
        const status = row.getValue("uploadStatus") as string;
        console.log(status, typeof(status));
        
        return (
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full w-fit border-[0.5px]",
            getStatusColor(status)
          )}>
            {getStatusIcon(status)}
            <span className="text-sm font-medium capitalize">
              {status}
            </span>
          </div>
        );
      }
    },
    {
      accessorKey: "uploadTimeStamp",
      header: "Scheduled Time",
      size: 180,
      cell: ({ row }) => {
        if (!row.original.autoUpload) return 'Not provided';
        const time = new Date(row.getValue("uploadTimeStamp")).toLocaleString();
        return (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {time}
              </span>
            </div>
        );
      }
    },
    {
      id: "upload-button",
      size: 100,
      cell: ({ row }) => {
        const project = row.original;
        return (
          <div className="flex items-center gap-2">
            {!project.autoUpload ? (
              <Button
                size="sm"
                onClick={() => onViewDetails(project)}
                className=""
              >
                <UploadCloud className="w-4 h-4 mr-2" />
                Upload
              </Button>
            ):null}
          </div>
        );
      }
    },
    {
      id: "actions",
      size: 150,
      cell: ({ row }) => {
        const project = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(project)}
            >
              View Details
            </Button>
          </div>
        );
      }
    },
  ];

  if (isLoading) {
    return <ProjectTableSkeleton />;
  }
  if (projects.length == 0){
    return <div>no project found</div>
  }
  return (
      <DataTable columns={columns} data={projects} />
  );
};

export default ProjectTable;