import { Request, Response } from "express"
import { response } from "../../utils/responseFormate";
import axios from "axios";
import prisma from "../../utils/db";
import { genereateJwtToken } from "../../utils/generateJwt";
import useragent from 'useragent';

export const loginController:any = async (req:Request, res:Response) => {
    const {code} = req.body;
    console.log(code);
    
    try {
      if (!code) {
       return response.error(res, "Code not found", 422); 
      }  
      const googleVerifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${code}`;
      const googleResponse = await axios.get(googleVerifyUrl, {
        responseType: "json",
      });

      console.log(googleResponse);

      let isUserExists = await prisma.user.findFirst({
        where:{
            email:googleResponse.data.email
        }
      })
      
      //device info with ip
      const agent = useragent.parse(req.headers['user-agent'] || "");
      const device = `${agent.os} - ${agent.toAgent()}`;
      const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress!;
     
      if(!isUserExists){
        isUserExists = await prisma.user.create({
            data:{
                email:googleResponse.data.email,
                username:googleResponse.data.name,
                avatar:googleResponse.data.picture || `https://ui-avatars.com/api/?name=${googleResponse.data.name}`
            }
        })
       
      //create a default name space for default social integration
      await prisma.socialAccountGroup.create({
          data: {
            userId: isUserExists.id,
            groupName: "default",
            groupDescription: "Name Space For Your All Integrations."
          }
       })
      }
    
    await prisma.loginActivity.create({
      data:{
        userId: isUserExists.id,
        ip: ipAddress?.toString(),
        device: device
      }  
    })
    
    const payload = {
        id: isUserExists.id,
        email: isUserExists.email
    } 

    const token = genereateJwtToken(payload);
    res.cookie("auth_token", token, {httpOnly: true, maxAge: 3600000})
    return response.message(res, "sign up successfull.", 200, {token,user:isUserExists})
    

    } catch (error) {
        console.log(error);
        
        return response.error(res, "failed to login/signup", 403, {error});
    }
}