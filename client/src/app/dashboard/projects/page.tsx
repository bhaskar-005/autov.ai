"use client";

import React, { useState } from "react";
import PageContent from "@/components/dashboard_ui/pagecontent";
import Modal from "@/components/modal";
import ProjectTable, { Project } from "@/components/project_ui/ProjectTable";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";


const projects = [
    {
      id: 1,
      name: "Project Alpha",
      image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=600&q=80",
      status: "Pending",
      namespace: "podcast",
      description: "This is a brief description of Project Alpha.",
      triggerTime: Date.now().toString(),
    },
    {
      id: 2,
      name: "Project Beta",
      image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=600&q=80",
      status: "Queued",
      namespace: "podcast",
      description: "This is a brief description of Project Beta.",
      triggerTime: Date.now().toString(),
    },
    {
      id: 3,
      name: "Project Gamma",
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=600&q=80",
      status: "Success",
      namespace: "podcast",
      description: "This is a brief description of Project Gamma.",
      triggerTime: Date.now().toString(),
    },
  ];

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null);

  return (
    <PageContent title="Projects" description={<p className="text-xs text-gray-600">All your projects</p>}>
      <div className="">
        <section className="flex justify-between my-6">
           <SearchInput />
           <div className="flex gap-4 items-center">
             <Button variant={"outline"}>Switch to Analitcs</Button>
             <Button>Create Project</Button>
           </div>
        </section>
        
        {/* table component  */}
        <ProjectTable
          projects={projects}
          onViewDetails={(projectInfo: Project) =>
            setSelectedProject(projectInfo)
          }
        />
      </div>

      {selectedProject && (
        <Modal
          name={selectedProject.name}
          description={selectedProject.description}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </PageContent>
  );
};

export default ProjectsPage;
