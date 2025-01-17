import { Request, Response } from "express";
import { response } from "../../utils/responseFormate";
import prisma from "../../utils/db";


export const getNameSpace:any = async (req: Request, res: Response) => {
    const page = parseInt(req.params.page) || 1;
    const limit = 10;
    //@ts-ignore
    const userId = req.userId; 
    console.log(userId, page);
     
    const skip = (page - 1) * limit;
    try {
        const totalNameSpace = await prisma.socialAccountGroup.count({
            where:{
              userId
            }
        })
        
        const nameSpaceData = await prisma.socialAccountGroup.findMany({
        where:{
             userId
        }, 
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        }
      })
      
      return response.message(res, "name space found.", 200, { nameSpaceData, totalNameSpace})
    } catch (error) {
       console.log(error);
       return response.error(res, 'Failed to get name space', 403, error) 
    }
};



export const createNameSpace:any = async (req:Request, res:Response)=>{
  //@ts-ignore
  const userId = req.userId;
  const {nameSpaceTitle, nameSpaceDescription} = req.body;
  
  if (!nameSpaceTitle ) {
    return response.error(res, "missing data.", 422)
  }
  try {
    const nameSpace = await prisma.socialAccountGroup.create({
        data:{
            userId,
            groupName: nameSpaceTitle,
            groupDescription: nameSpaceDescription
        }
    })  
    return response.message(res, "name space created successfully", 200, {nameSpace}); 
  } catch (error) {
    console.log(error);
    return response.error(res, "error while creating name space", 404, error) 
  }
}



export const updateNameSpace:any = async (req:Request, res:Response) => {
    const {groupId} = req.params;
    const {nameSpaceTitle, nameSpaceDescription} = req.body;
    //@ts-ignore
    const userId = req.userId;

    try {
       if (!nameSpaceTitle || !nameSpaceDescription) {
        return response.error(res, "missing data.", 422)
       }
       const nameSpace = await prisma.socialAccountGroup.update({
        where:{
           id: parseInt(groupId),
           userId
        },
        data:{
          groupName: nameSpaceTitle,
          groupDescription: nameSpaceDescription
        }
       })
    
     return response.message(res, "name space updated successfully", 200, {nameSpace})

    } catch (error) {
       return response.error(res, "error while updating name space", 400); 
    }
}



export const deleteNameSpace:any = async (req: Request, res: Response) => {
    const { groupId } = req.params;
    //@ts-ignore
    const userId = req.userId;
    try {
      const deleteNameSpace = await prisma.socialAccountGroup.delete({
        where:{
           id: parseInt(groupId),
           userId
        }
      }) 
      
      return response.message(res, 'name Space deleted successfully.', 200, {deleteNameSpace})
    } catch (error) {
      console.log(error);
      return response.error(res, "error while deleting name space", 400, {error});
    }
}