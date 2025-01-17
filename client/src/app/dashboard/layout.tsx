"use client"
import { AppSidebar } from '@/components/app-sidebar';
import AuthValidationProvider from '@/components/AuthValidationProvider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ReactNode, useEffect } from 'react';

const layout = ({children}:{children:ReactNode}) => {
  
  return (
    <AuthValidationProvider>
    <SidebarProvider>
      <AppSidebar />
        <main className='w-full'>
          {children}
        </main>
    </SidebarProvider>
    </AuthValidationProvider>
  );
}

export default layout;
