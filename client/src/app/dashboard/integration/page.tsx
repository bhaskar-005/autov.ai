"use client"
import PageContent from '@/components/dashboard_ui/pagecontent';
import TooltipComponent from '@/components/Tooltip';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import React, { useState } from 'react';

interface Platform {
  id: string;
  name: string;
  logo: string;
  description: string;
}

const platforms: Platform[] = [
  { 
    id: 'facebook', 
    name: 'Facebook', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg', 
    description: 'Integrate your Facebook account for managing pages.' 
  },
  { 
    id: 'youtube', 
    name: 'YouTube', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Youtube%28amin%29.png', 
    description: 'Integrate your YouTube channel for video uploads.' 
  },
  { 
    id: 'instagram', 
    name: 'Instagram', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png', 
    description: 'Integrate your Instagram account for posts and reels.' 
  },
  { 
    id: 'tiktok', 
    name: 'TikTok', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/TikTok_logo.svg', 
    description: 'Integrate your TikTok account for short videos.' 
  },
  { 
    id: 'x', 
    name: 'X', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/X_logo_2023.svg', 
    description: 'Integrate your X account for tweets and threads.' 
  },
];

const PlatformCard: React.FC<{ platform: Platform; onIntegrate: (platform: Platform) => void }> = ({ platform, onIntegrate }) => {
  return (
    <div className="flex items-center justify-between border p-4 rounded-lg mb-4">
      <div className="flex items-center gap-4">
        <img src={platform.logo} alt={platform.name} className="w-8 h-8" />
        <div>
          <p className="font-medium text-sm">{platform.name}</p>
          <p className="text-xs text-gray-500">{platform.description}</p>
        </div>
      </div>
      <Button onClick={() => onIntegrate(platform)} className="text-sm">Integrate</Button>
    </div>
  );
};

const Page: React.FC = () => {
  const [integratedPlatforms, setIntegratedPlatforms] = useState<Platform[]>([{ 
    id: 'instagram', 
    name: 'Instagram', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png', 
    description: 'Integrate your Instagram account for posts and reels.' 
  },]);

  const handleIntegrate = (platform: Platform) => {
    if (!integratedPlatforms.some((p) => p.id === platform.id)) {
      setIntegratedPlatforms((prev) => [...prev, platform]);
    }
  };

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
          <PlatformCard key={platform.id} platform={platform} onIntegrate={handleIntegrate} />
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
