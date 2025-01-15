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
console.log("code", code);
  console.log("----------------");
  
  if (!code) {
    return NextResponse.json(
      { error: 'Authorization code is missing' },
      { status: 400 }
    );
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    // Log the tokens for debugging (or save to DB)
    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);
    console.log('Expires At:', tokens.expiry_date);
    console.log('token At:', tokens);


    return NextResponse.json(
      {message: 'Authorization successful'},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to exchange code for tokens' },
      { status: 500 }
    );
  }
}
