"use client"
import Badge from '@/components/Badge';
import PageContent from '@/components/dashboard_ui/pagecontent';
import TooltipComponent from '@/components/Tooltip';
import { Button } from '@/components/ui/button';
import { platforms } from '@/contant/Integration.conf';
import { HelpCircle, Link, Star, TimerResetIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

interface Platform {
  id: string;
  name: string;
  logo: string;
  description: string;
  on_click: Function;
  isAvailable: boolean;
}

const PlatformCard: React.FC<{ platform: Platform }> = ({ platform}) => {
  return (
    <div className="flex items-center justify-between border p-5 rounded-lg mt-6">
      <div className="flex items-center gap-4">
        <img src={platform.logo} alt={platform.name} height={8} width={8} className="w-10 h-10" />
        <div>
          <div className='flex items-center gap-4'>
          <p className="font-medium text-gray-700 text-base">{platform.name}</p> 
           {
            !platform.isAvailable && (
              <Badge content={
                <p className='text-xs px-1'>coming soon</p>
            }/>
            )
           }
          </div>
          <p className="text-xs text-gray-500 mt-1">{platform.description}</p>
        </div>
      </div>
      <Button onClick={() => platform.on_click()} className={`text-sm font-normal text-gray-600 w-60 ${!platform.isAvailable ? "cursor-not-allowed":"cursor-pointer"}`} variant={"outline"} ><Link/> Integrate {platform.name}</Button>
    </div>
  );
};

const Page: React.FC = () => {
  const [integratedPlatforms, setIntegratedPlatforms] = useState<Platform[]>([]);

  return (
    <PageContent
      title="Integration"
      description={
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-600">Integrate your account</p>
          <TooltipComponent
            triggerElement={<HelpCircle className="w-[14px] hover:cursor-pointer" />}
            tooltipContent={
              <div className="space-y-1">
                <p className="text-[13px] font-medium">Integrate Your Account</p>
                <p className="text-xs text-muted-foreground">
                  Select a platform where you want to upload your content by clicking the <code>Integrate</code> button and <code>confirm</code>.
                </p>
              </div>
            }
          />
        </div>
      }
    >
      <div>
        {platforms.map((platform) => (
          <PlatformCard key={platform.id} platform={platform} />
        ))}
      </div>

      {integratedPlatforms.length > 0 && (
        <div>
         <hr className="my-8" />
          <h3 className="font-medium text-lg mb-4">Integrated Platforms</h3>
          <ul className="space-y-2">
            {integratedPlatforms.map((platform) => (
              <li key={platform.id} className="flex items-center gap-4">
                <img src={platform.logo} alt={platform.name} className="w-6 h-6" />
                <p className="text-sm font-medium">{platform.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </PageContent>
  );
};

export default Page;
