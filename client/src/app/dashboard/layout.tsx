import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ReactNode } from 'react';

const layout = ({children}:{children:ReactNode}) => {
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
