import { handleFacebookIntegration, handleYoutubeIntegration } from "@/app/dashboard/integration/integrationHandlers";

export const platforms = [
    { 
      id: 'facebook', 
      name: 'Facebook', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg', 
      description: 'Integrate your Facebook account for managing pages.',
      on_click: handleFacebookIntegration,
      isAvailable: true
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      logo: "https://cdn3.iconfinder.com/data/icons/social-network-30/512/social-06-512.png", 
      description: 'Integrate your YouTube channel for video uploads.',
      on_click: handleYoutubeIntegration,
      isAvailable: true
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png', 
      description: 'Integrate your Instagram account for posts and reels.' ,
      on_click: ()=>null,
      isAvailable: false
    },
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      logo: 'https://w7.pngwing.com/pngs/814/840/png-transparent-tiktok-tiktok-logo-tiktok-icon-thumbnail.png', 
      description: 'Integrate your TikTok account for short videos.' ,
      on_click: ()=>null,
      isAvailable: false
    },
    { 
      id: 'x', 
      name: 'Twitter/X', 
      logo: 'https://static.vecteezy.com/system/resources/previews/042/148/611/non_2x/new-twitter-x-logo-twitter-icon-x-social-media-icon-free-png.png', 
      description: 'Integrate your X account for tweets and threads.' ,
      on_click: ()=>null,
      isAvailable: false
    },
  ];