"use client"
import { useUserInfo } from '@/zustand/userState';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

const AuthValidationProvider = ({children}:{children:ReactNode}) => {
    const router = useRouter() 
    const token = useUserInfo((state)=> state.token);
    
    useEffect(() => {
      if (!token) {
        router.push('/?login=true');
      }
    }, [token, router]);


  return (
    <>
      {children}
    </>
  );
}

export default AuthValidationProvider;
