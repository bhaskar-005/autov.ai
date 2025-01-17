import { NextFunction, Request, Response } from "express";
import { response } from "../utils/responseFormate";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../utils/db";

export const authMiddleware:any = async(req: Request, res: Response, next: NextFunction)=>{
    const auth_token = req.header('Authorization')||req.cookies.auth_token; 
    try {
     const decode = jwt.verify(auth_token!, process.env.JWT_SECRET_KEY!)as JwtPayload;
     
     console.log(decode);
     
     const isUserExists = await prisma.user.findFirst({
        where:{
            id: decode.id,
        }
     })
     if (!isUserExists) {
        return response.error(res, 'user not exists', 404)
     }
     //@ts-ignore
     req.userId = decode.id;
     //@ts-ignore
     req.email = decode.email;
     
     next();
   } catch (error) {
      console.log(error);
      response.error(res, 'you are not authenticated', 401, {error}) 
   } 
}