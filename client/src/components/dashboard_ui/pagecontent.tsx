import React, { ReactNode } from "react";
import { SidebarTrigger } from "../ui/sidebar";

const PageContent = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <section className="">
      <div className="xl:w-[1100px] w-auto w-xl my-2 mx-auto">
        <div className="flex items-center flex-between gap-6 ">
          <SidebarTrigger />
          <div className="py-4">
            <h1 className="text-xl">{title}</h1>
            {description}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default PageContent;
