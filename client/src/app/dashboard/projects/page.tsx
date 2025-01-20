"use client";

import React, { useEffect, useState } from "react";
import PageContent from "@/components/dashboard_ui/pagecontent";
import Modal from "@/components/modal";
import ProjectTable, { ProjectType } from "@/components/project_ui/ProjectTable";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/zustand/projectState";
import { ArrowBigUpDashIcon, ChartSpline, SquareArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";


const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<null | any>(null);
  const projects = useProjectStore((state)=> state.projectData);
  const getProjects = useProjectStore((state)=> state.getProjects);
  const ProjectLoading = useProjectStore((state)=> state.loading);
  const router = useRouter();
  useEffect(()=>{
    if(!projects || projects.length == 0) getProjects(1)
  },[])
 
  return (
    <PageContent title="Projects" description={<p className="text-xs text-gray-600">All your projects</p>}>
      <div className="">
        <section className="flex justify-between my-6">
           <SearchInput />
           <div className="flex gap-4 items-center">
             <Button variant={"outline"}> <ChartSpline/> Switch to Analitcs</Button>
             <Button onClick={()=> router.push('/dashboard/projects/create') }>< SquareArrowUpRight /> Create Project</Button>
           </div>
        </section>
        
        {/* table component  */}
            <ProjectTable
            isLoading={ProjectLoading}
            projects={projects || []}
            onViewDetails={(projectInfo: ProjectType) =>
            setSelectedProject(projectInfo) }
          />
     </div>

        <Modal
          isOpen={selectedProject}
          name={selectedProject?.name}
          onClose={() => setSelectedProject(null)}
        >
          <div>hi</div>
        </Modal>
    </PageContent>
  );
};

export default ProjectsPage;
