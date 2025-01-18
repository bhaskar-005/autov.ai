import { baseUrl } from "@/contant/urls.conf"
import axiosInstance from "../axiosInstance"
import { getLocalStorageItem } from "@/lib/local-storage";
import { ProjectInputType } from "@/zod/projectSchema";

const Token = getLocalStorageItem('auth_token');
const headers = {
     'Content-Type': 'application/json',
     "Authorization": Token
}

export const ProjectApi = {
    getProjects: async(page:number)=>{
     return await axiosInstance.get(baseUrl+`/project/get-project/${page}`, {headers});
    },

    createProject: async(body:ProjectInputType)=>{
     return await axiosInstance.post(baseUrl+`/project/create-project`, {...body}, {headers})
    }
}