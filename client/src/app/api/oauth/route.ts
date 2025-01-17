import { baseUrl } from '@/contant/urls.conf';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const keys = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URL||"http://localhost:3000/api/oauth", // Replace with your actual callback URL
  };

const oauth2Client = new OAuth2Client(
    keys.client_id,
    keys.client_secret,
    keys.redirect_uri
) 

export async function GET(req: NextApiRequest) { const { searchParams } = new URL(req.url!);
const code = searchParams.get('code');
const state = searchParams.get('state');
  
  if (!code) {
    return NextResponse.json(
      { error: 'Authorization code is missing' },
      { status: 400 }
    );
  }

  try {
     // Decode the state parameter
     const decodedState = JSON.parse(
      Buffer.from(state as string, 'base64').toString('utf-8')
    );
    const { tokens } = await oauth2Client.getToken(code);

    // Log the tokens for debugging (or save to DB)
    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);
    console.log('Expires At:', tokens.expiry_date);
    console.log('token At:', tokens);

    //get channels info and logo
    const youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/channels';
    const response = await axios.get(youtubeApiUrl, {
      params: {
        part: 'snippet',
        mine: 'true',
      },
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        Accept: 'application/json',
      },
    });
    
    const channelInfo = response.data.items?.[0]?.snippet;
    const channelName = channelInfo?.title;
    const channelCustomUrl = channelInfo?.customUrl;
    const channelLogo = channelInfo?.thumbnails?.default?.url;
    console.log(response.data);
    console.log('--------------------------');
    
    console.log(decodedState.token, "----------------auth_token")
    
   //save credentials
    const saveCred = await axios.post(baseUrl+'/credential/save/youtube', 
      {
         access_token:tokens.access_token, 
         refresh_token:tokens.refresh_token,
         token_expiry_date:tokens.expiry_date,
         channel_name: channelName,
         channel_customurl: channelCustomUrl,
         channel_logo: channelLogo
       },
       {
        headers:{
          'Content-Type': 'application/json',
          "Authorization": decodedState.token
         } 
      }
    ) 

    console.log(saveCred.data);
    

    return NextResponse.json(
      {message: 'Authorization successful'},
      { status: 200 }
    );
  } catch (error:any) {
    console.log(error);
    console.log(error.response);
    
    return NextResponse.json(
      { error: error.response.data.error_message || error.message || "error while integration/saving credentials."},
      { status: 500 }
    );
  }
}
