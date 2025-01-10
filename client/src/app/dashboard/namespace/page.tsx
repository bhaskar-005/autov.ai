'use client'
import PageContent from '@/components/dashboard_ui/pagecontent';
import Modal from '@/components/modal';
import NameSpaceTable from '@/components/namespace_ui/NameSpaceTable';
import SearchInput from '@/components/search-input'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const index = () => {
  const [selectedNameSpace, setSelectedNameSpace] = useState<string|number|null>(null);
  const dummyNamespace = [
    {
      id: 2,
      name: "default",
      accounts: "4",
      description: "default",
      createdAt: Date.now.toString(),
    },
    {
      id: 3,
      name: "podcast",
      accounts: "4",
      description: "namespace for podcasts",
      createdAt: Date.now.toString(),
    },
    {
      id: 22,
      name: "test",
      accounts: "3",
      description: "name space for test videos",
      createdAt: Date.now.toString(),
    },
    {
      id: 21,
      name: "tv shows",
      accounts: "3",
      description: "tv shows.",
      createdAt: Date.now.toString(),
    }
  ]
  return (
    <PageContent title='Name Space' description={<p className="text-xs text-gray-600">Grouping for your social account</p>}>
       <section className="flex justify-between my-6">
           <SearchInput />
           <div className="flex gap-4 items-center">
             <Button variant={"outline"}>Switch to Analitcs</Button>
             <Button>Create Name Space</Button>
           </div>
        </section>
       
       {/* dub library */}
       <NameSpaceTable NameSpaceData={dummyNamespace} onAddHandler={(id:string|number)=> setSelectedNameSpace(id)}  />
       
       {selectedNameSpace && (
        <Modal
          name={selectedNameSpace.toString()}
          description={" "}
          isOpen={!!selectedNameSpace}
          onClose={() => setSelectedNameSpace(null)}
        />
      )}
    </PageContent>
  );
}

export default index;
