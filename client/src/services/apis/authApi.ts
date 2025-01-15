import axiosInstance from "../axiosInstance"

const authApi = {
    googleLogin: async ({token}:{token:string})=>{
       return await axiosInstance.post('/auth/login',{code: token});
    }
}

export default authApi;