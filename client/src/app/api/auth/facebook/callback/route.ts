import { NextRequest, NextResponse } from 'next/server';

const FB_TOKEN_URL = 'https://graph.facebook.com/v16.0/oauth/access_token';
const CLIENT_ID = process.env.META_APP_ID!;
const CLIENT_SECRET = process.env.META_APP_SECRET!;
const REDIRECT_URI = process.env.META_REDIRECT_URL!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  console.log(code);
  
  if (!code) {
    return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch(
      `${FB_TOKEN_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
      )}&client_secret=${CLIENT_SECRET}&code=${code}`
    );

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for tokens');
    }

    const tokens = await tokenResponse.json();
    const { access_token } = tokens;

    console.log("tokens",tokens);
    

    // (Optional) Fetch User Data
    const userDataResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email&access_token=${access_token}`
    );

    if (!userDataResponse.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await userDataResponse.json();
    console.log(userData);
    

    return NextResponse.json({ tokens, userData });
  } catch (error) {
    console.error('Error during Facebook OAuth:', error);
    return NextResponse.json(
      { error: 'Failed to complete Facebook OAuth' },
      { status: 500 }
    );
  }
}
