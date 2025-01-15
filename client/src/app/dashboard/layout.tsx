"use client"
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useUserInfo } from '@/zustand/userState';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

const layout = ({children}:{children:ReactNode}) => {
  const router = useRouter() 
  const token = useUserInfo((state)=> state.token);
  
  if(!token){
    router.push('/?login=true');
    return null;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
        <main className='w-full'>
          {children}
        </main>
    </SidebarProvider>
  );
}

export default layout;
