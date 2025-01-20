import { z } from "zod";
import { ProjectApi } from "@/services/apis/projectApi";
import { create } from "zustand";
import { ProjectInputType } from "@/zod/projectSchema";
import { ProjectType } from "@/components/project_ui/ProjectTable";

type ProjectStoreType = {
  loading: boolean;
  projectData: ProjectType[] | null; 
  totalProjectCount: number;
  getProjects: (page: number) => void;
  createProject: (data:ProjectInputType) =>void;
};

export const useProjectStore = create<ProjectStoreType>((set) => ({
  loading: false,
  projectData: [],
  totalProjectCount: 0,
  
  getProjects: async (page) => {
    set({ loading: true });
    try {
      const response = await ProjectApi.getProjects(page);
      const projects = response.data.data.Projects;
      const totalCount = response.data.data.totalProjectCount;
      set({ projectData: projects, totalProjectCount: totalCount });
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      set({ loading: false });
    }
  },

  createProject: async (projectData) => {
    set({ loading: true });
    try {
      const response = await ProjectApi.createProject(projectData); 
      const createdProject = response.data.data.project; 
      console.log(response.data.data);
      
      set((state) => ({
        projectData: [createdProject, ...(state.projectData || [])],
      }));
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
