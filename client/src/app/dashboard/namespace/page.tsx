import PageContent from '@/components/dashboard_ui/pagecontent';
import { Suspense } from 'react';
import NameSpaceContant from './NameSpaceContant';

const index = async() => {
  return (
    <PageContent title='Name Space' description={<p className="text-xs text-gray-600">Grouping for your social account</p>}>
      <NameSpaceContant/> 
    </PageContent>
  );
}

export default index;
