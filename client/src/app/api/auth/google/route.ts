import { OAuth2Client } from 'google-auth-library';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

const keys = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  redirect_uri: process.env.GOOGLE_REDIRECT_URL||"http://localhost:3000/api/oauth", // Replace with your actual callback URL
};

const SCOPES = [
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtube.upload',
];

let oAuth2Client:any;

function getOAuth2Client() {
  if (!oAuth2Client) {
    oAuth2Client = new OAuth2Client(
      keys.client_id,
      keys.client_secret,
      keys.redirect_uri
    );
  }
  return oAuth2Client;
}

// Route to generate Google Auth URL
export function GET(req: NextApiRequest) {
  const oAuth2Client = getOAuth2Client();

    const url = oAuth2Client.generateAuthUrl({
      access_type: 'offline', // For refresh tokens
      scope: SCOPES,
    });

    console.log(url);
    return NextResponse.redirect(url);
}
