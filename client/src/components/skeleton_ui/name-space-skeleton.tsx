import React from 'react';
import { Skeleton } from '../ui/skeleton';

const RowSkeleton = ()=>{
  return (
    <div className='flex gap-4'>
      <Skeleton className='rounded-lg w-full h-6'/>
      <Skeleton className='rounded-lg w-full h-6'/>
      <Skeleton className='rounded-lg w-[60%] h-6'/>
      <Skeleton className='rounded-lg w-[60%] h-6'/>
      <Skeleton className='rounded-lg w-[20%] h-6'/>
    </div>
  )
}
const NameSpaceSkeleton = () => {
  return (
    <div className='flex flex-col'>
       <Skeleton className='h-8 rounded-xl w-full'/> 
        
        <div className='mt-4 flex flex-col gap-3'>
          <RowSkeleton/>
          <RowSkeleton/>
          <RowSkeleton/>
          <RowSkeleton/>
          <RowSkeleton/>
        </div>
    </div>
  );
}

export default NameSpaceSkeleton;
