import { baseUrl } from "@/contant/urls.conf"
import axiosInstance from "../axiosInstance"
import { getLocalStorageItem } from "@/lib/local-storage";

type createProjectBody = {
    project_name:string,
    project_description: string|null,
    video_url: string,
    is_auto_generated: boolean,   //as of now only support auto_generated.
    name_space_id: string
    auto_upload: boolean
    number_of_clips: number,
    upload_time: string|null,

    speech_language: string,
}

const Token = getLocalStorageItem('auth_token');
const headers = {
     'Content-Type': 'application/json',
     "Authorization": Token
}

export const ProjectApi = {
    getProjects: async(page:number)=>{
     return await axiosInstance.get(baseUrl+`/project/get-project/${page}`, {headers});
    },

    createProject: async(body:createProjectBody)=>{
     return await axiosInstance.post(baseUrl+`/project/create-project`, {...body}, {headers})
    }
}