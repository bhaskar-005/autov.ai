import { NextRequest, NextResponse } from 'next/server';

const FB_AUTH_URL = 'https://www.facebook.com/v16.0/dialog/oauth';
const CLIENT_ID = process.env.META_APP_ID;
const REDIRECT_URI = `${process.env.REDIRECT_URL}/api/auth/facebook/callback`;
const SCOPES = 'email,public_profile,pages_read_engagement,pages_manage_posts';

export async function GET() {
  const url = `${FB_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPES)}&response_type=code`;

  return NextResponse.redirect(url);
}
