import { Request, Response } from "express";
import { response } from "../../utils/responseFormate";
import { projectBodySchema } from "../../zod/projectBodySchema";
import prisma from "../../utils/db";


export const GetProjects: any  = async (req:Request, res:Response) => {
    const page = parseInt(req.params.page) || 1;
    //@ts-ignore
    const userId = req.userId; 
    const limit = 6;
    const skip = (page - 1 ) * limit;
    try {
       const totalProjectCount = await prisma.upload.count({
          where: {
            uploaderId: userId
          } 
       })
       
       const Projects = await prisma.upload.findMany({
        where:{
            uploader: userId
        },
        skip,
        take: limit,
        select:{
            uploaderId:true,
            uploader: {
                select:{
                    email:true,
                    username:true,
                }
            },
            UploadName: true,
            uploadDescription: true,
            videoUrl: true,
            isAutoGenerated: true,
            uploadDisplayImage: true,
            autoUpload: true,
            uploadTimeStamp:true,
            numberOfClips: true,
            groupId:true,
            socialAccountGroup:{
                select:{
                    groupName:true,
                    groupDescription:true,
                }
            },
            uploadStatus: true,
            speechLanguage: true,
        }
       })

       return response.message(res, "projects found.", 200, {Projects, totalProjectCount})
    } catch (error) {
      console.log(error);
      return response.error(res, "failed to get projects", 404);
    }
};


export const CreateProject:any = async(req:Request, res:Response )=>{
    try {
      const validateProjectData = projectBodySchema.parse(req.body);
      //@ts-ignore
      const userId = req.userId;
      
      const videoUrl = validateProjectData.video_url;
      const videoIdMatch = videoUrl.match(/(?:\?v=|\/embed\/|\.be\/|\/v\/|\/e\/|watch\?v=|&v=)([a-zA-Z0-9_-]{11})/);
      if (!videoIdMatch) {
        return response.error(res, "invalid video Link.", 404)
     }
      
      const createUpload = await prisma.upload.create({
        data:{
            uploaderId: userId,
            UploadName: validateProjectData.project_name,
            videoUrl:  validateProjectData.video_url,
            uploadDescription: validateProjectData.project_description,
            uploadDisplayImage: `https://img.youtube.com/vi/${videoIdMatch[1]}/default.jpg`,
            // isAutoGenerated: validateProjectData.is_auto_generated,
            autoUpload: validateProjectData.auto_upload,
            uploadTimeStamp: new Date(validateProjectData.upload_time!),
            numberOfClips: validateProjectData.number_of_clips,
            groupId:  parseInt(validateProjectData.name_space_id),
            speechLanguage: validateProjectData.speech_language
        }
      })

      //todo push it to the queue
      
      return response.message(res, "Project added to queue successfully", 200, {project:createUpload} )

    } catch (error) {
       console.log(error);
       return response.error(res, "Error creating project.", 406)
    }
}