import { getLocalStorageItem, setLocalStorageItem } from "@/lib/local-storage";
import { create } from "zustand";

type userInfoType = {
    username: string;
    email: string;
    avatar: string;
    id: number;
}
type UserStore = {
    userInfo: userInfoType|null;
    token: string | null;
    setUser: (token: string, userinfo:any) => void;
    logout: ()=>void;
}

export const useUserInfo = create<UserStore>((set)=>({
   userInfo: getLocalStorageItem("user_info") ?? null,
   token: getLocalStorageItem("auth_token")?? null,

   setUser: (token:string, userInfo:any)=> {
    set({ token, userInfo })
     setLocalStorageItem("user_info", userInfo);
     setLocalStorageItem("auth_token", token);
   },
   logout: ()=>{
     ({token:null, userInfo:null})
     setLocalStorageItem("user_info", null);
     setLocalStorageItem("auth_token", null);
   }
}))

