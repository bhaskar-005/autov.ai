"use client"

import Modal from '@/components/modal';
import NameSpaceTable from '@/components/namespace_ui/NameSpaceTable';
import SearchInput from '@/components/search-input'
import NameSpaceSkeleton from '@/components/skeleton_ui/name-space-skeleton';
import { Button } from '@/components/ui/button';
import { AddEditNameSpace} from '@/modals/add-edit-name-space';
import { useNameSpace } from '@/zustand/nameSpaceState';
import React, { useEffect, useState } from 'react';

type modeStateType = {
  mode: null | "view"| "edit"| "create";
  seletedNameSpaceId?: null | string | number;
}

const NameSpaceContant = ()=>{
    const [modalState, setModalState] = useState<modeStateType>({mode: null, seletedNameSpaceId: null})  
    const [currentPage, setCurrentPage] = useState(1);
    const getNameSpace = useNameSpace((state)=> state.getNameSpace);
    const nameSpaceData = useNameSpace((state)=> state.nameSpace);
    const nameSpaceLoading = useNameSpace((state)=> state.loading);
    const nameSpaceCreateHandler = useNameSpace((state)=> state.createNameSpace)
    const nameSpaeceEditHandler = useNameSpace((state)=> state.updateNameSpace)
    const deleteNameSpaceHandler = useNameSpace((state)=> state.deleteNameSpace) 

    console.log(nameSpaceData);
    
    useEffect(() => {
      if (!nameSpaceData || nameSpaceData.length === 0 ) {
        getNameSpace(currentPage);
      }
    }, [currentPage]);
  
  return (
    <> 
      <section className="flex justify-between my-6">
          <SearchInput />
          <div className="flex gap-4 items-center">
            <Button variant={"outline"}>Switch to Analitcs</Button>
            <Button onClick={()=> setModalState({mode:"create"})}>Create Name Space</Button>
          </div>
       </section>
      
      todo: 
      1.default should be permanent,
      2.UI needs impovement,
      3.Add or see,

      {/* dub library */}
      {
        nameSpaceLoading ? (
         <NameSpaceSkeleton/>
        ):(
         <>
          {
            nameSpaceData? (
            <NameSpaceTable 
             NameSpaceData={nameSpaceData}
             onDeleteHandler={(id:string|number)=> deleteNameSpaceHandler(id)}
             onEditHandler={(id:string|number)=>  setModalState({mode:"edit", seletedNameSpaceId:id})}  
             onAddHandler={(id:string|number)=>  setModalState({mode:"view", seletedNameSpaceId:id})}  />
          ):(
            <div>No Name Space Found</div>
          )
          }
        </> 
        )
      }
      <Modal
         name={`${modalState.mode!} name space - ${modalState.seletedNameSpaceId}`}
         isOpen={!!modalState.mode}
         onClose={() => setModalState({mode: null, seletedNameSpaceId: null})}
       >
        {modalState.mode === "create" && (
        <AddEditNameSpace
         mode={"create"}
         loading={nameSpaceLoading}
         onSubmitHandler={(data)=> {
          nameSpaceCreateHandler(data.NameSpaceTitle, data.NameSpaceDescription);
          setModalState({mode:null, seletedNameSpaceId:null})
        }} 
        />
       )}
        {modalState.mode === "edit" && (
        <AddEditNameSpace
         mode={"edit"}
         loading={nameSpaceLoading}
         initialData={{
          NameSpaceTitle: nameSpaceData?.find((ns)=> ns.id === modalState.seletedNameSpaceId)?.groupName,
          NameSpaceDescription: nameSpaceData?.find((ns)=> ns.id === modalState.seletedNameSpaceId)?.groupDescription
         }}
         onSubmitHandler={(data)=> {
          nameSpaeceEditHandler(data.NameSpaceTitle, data.NameSpaceDescription, modalState.seletedNameSpaceId!);
          setModalState({mode: null, seletedNameSpaceId: null})
         }} 
         />
        )}
        {modalState.mode === "view" && (
          <div>Details of Namespace ID {modalState.seletedNameSpaceId}</div>
        )}
       </Modal>
    </>
   )  
}

export default NameSpaceContant;