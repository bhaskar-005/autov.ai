import { getLocalStorageItem } from "@/lib/local-storage";
import axios from "axios";

const authToken = getLocalStorageItem("auth_token");
const state = btoa(
    JSON.stringify({
     token: authToken,
     nonce: crypto.randomUUID(), //nonce for CSRF protection
    })
  )
export const handleYoutubeIntegration = async()=>{
  const res = await axios.get('/api/auth/google');
  const googleAuthUrl = res.data;

  const redirectUrl = googleAuthUrl+`&state=${state}`;
 
  window.open(redirectUrl, "_blank", "location=yes, height=570, width=520, status=yes");
  
}
export const handleFacebookIntegration = ()=>{
  window.location.href = '/api/auth/facebook';
}