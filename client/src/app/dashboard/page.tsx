import PageContent from '@/components/dashboard_ui/pagecontent';
import { Button } from '@/components/ui/button';
import React from 'react';

const page = () => {
  return (
    <div className=''>
        <PageContent title='Dashboard' description='hi wellcome back to autov'>
            <div>
                <Button>was not found</Button>
            </div>
        </PageContent>
    </div>
  );
}

export default page;
