import { Request, Response } from "express";
import { response } from "../../utils/responseFormate";
import prisma from "../../utils/db";

export const saveYoutubeCredentials:any = async(req:Request, res:Response)=> {
   const {access_token, refresh_token, token_expiry_date, channel_name, channel_customurl, channel_logo} = req.body;
   //@ts-ignore
   const userId = req.userId;
  //TODO check for if the token is expired then refresh it
   const isChannelAlreadyExists = await prisma.youtubeCredential.findFirst({
     where: {
      userId: userId,
      channelCustomUrl:channel_customurl
     }
   })

   if (isChannelAlreadyExists) {
    return response.error(res, "channel already exists", 403)
   }

   const findDefaultNameSpace = await prisma.socialAccountGroup.findFirst({
    where:{
      groupName: "default",
      userId: userId
    }
   })
   try {
      const saveCred = await prisma.youtubeCredential.create({
        data:{
          userId: userId,
          groupId: Math.floor(findDefaultNameSpace?.id!),
          channelName: channel_name,
          channelCustomUrl: channel_customurl,
          channelLogo: channel_logo,
          accessToken: access_token,
          refreshToken: refresh_token,
          accessTokenExpiry: token_expiry_date          
        }
      })
    console.log(saveCred);
    
     return response.message(res, "credential saved successfully", 200)
    } catch (error) {
      console.log(error);
      return response.error(res, 'error while saving you credential', 434 ) 
    }
}