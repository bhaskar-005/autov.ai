import { baseUrl } from "@/contant/urls.conf"
import axiosInstance from "../axiosInstance"
import { getLocalStorageItem } from "@/lib/local-storage";

const Token = getLocalStorageItem('auth_token');
const headers = {
     'Content-Type': 'application/json',
     "Authorization": Token
}

export const nameSpaceApi = {
   getNameSpace: async(page:string|number)=> {
    console.log(Token);
     
    return await axiosInstance.get(`${baseUrl}/get-name-space/${page}`,{ headers });
   },

   createNameSpace: async(nameSpaceTitle:string, nameSpaceDescription:string)=> {
    return await axiosInstance.post(`${baseUrl}/create-name-space`,{nameSpaceTitle, nameSpaceDescription},{headers});
   },

   editNameSpace: async(nameSpaceTitle:string, nameSpaceDescription:string, groupId:string|number)=> {
    return await axiosInstance.put(`${baseUrl}/update-name-space/${groupId}`,{nameSpaceTitle, nameSpaceDescription}, {headers});
   },

   deleteNameSpace: async(groupId:string|number)=> {
    return await axiosInstance.delete(`${baseUrl}/delete-name-space/${groupId}`, {headers});
   },

}