"use client";

import React from 'react';
import Modal from '../modal';
import { GoogleLogin } from "@react-oauth/google";
import authApi from '@/services/apis/authApi';
import { useToast } from '@/hooks/use-toast';
import { useUserInfo } from '@/zustand/userState';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const LoginModal = () => {
  const setUserInfo = useUserInfo((state)=> state.setUser);
  const router = useRouter();
  const {toast} = useToast();
  
  //open modal from url
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const isLoginModalOpen = searchParams.get('login');
  
  const closeModal = ()=>{
    router.push(`${pathName}`);
  }

  const GoogleAuthTokenHandler = async (data: any) => {
    const GoogleToken = data.credential;
    console.log(GoogleToken);
    
    if (!GoogleToken) {
      return;
    }
    try {
    const response = await authApi.googleLogin({token: GoogleToken});
    const { user, token } = response.data.data;
    console.log(user, token);
    setUserInfo(token, user); 
    closeModal();
    router.push('/dashboard')

    } catch (error: any) {
      console.log(error);
        toast({
        title:"Login failed",
        description: "Could not login, please try again"
    })      
    }
  }

  return (
     <Modal name='Start With Google' onClose={closeModal} isOpen={JSON.parse(isLoginModalOpen!) === true}>
      <div className="w-full">
          <GoogleLogin 
             onSuccess={(data) => GoogleAuthTokenHandler(data)} 
             onError={() => {
              toast({
                title:"Login failed",
                description: "Could not login, please try again"
              }) 
            }} />
      </div>
     </Modal> 
  );
}
export default LoginModal;
