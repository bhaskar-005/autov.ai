import React, { ReactNode, useEffect } from 'react';
import LoginModal from './layouts/LoginModal';
import { GoogleOAuthProvider } from '@react-oauth/google';

const RootProvider = ({children}:{children:ReactNode}) => {

  return (
    <div>
    <GoogleOAuthProvider clientId={process.env.GOOGLE_AUTH_CLIENT_ID!}>
      {children} 
      <LoginModal/>
    </GoogleOAuthProvider>
    </div>
  );
}

export default RootProvider;
