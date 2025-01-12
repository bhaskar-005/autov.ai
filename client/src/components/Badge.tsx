import React, { ReactNode } from 'react';

const Badge = ({content}:{content:ReactNode}) => {
  return (
     <span className="xs:px-3 xs:py-1 flex items-center gap-1 rounded-full bg-yellow-400/[.25] px-1.5 py-0.5 text-xs font-medium text-yellow-600">
         {content}
     </span>
  );
}

export default Badge;
