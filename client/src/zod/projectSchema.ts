import {z} from 'zod';

export const projectFormSchema = z.object({
    project_name: z.string({ required_error: "Project name is required" }),
    project_description: z.string().optional(),
    video_url: z.string().url({ message: "Please enter a valid video URL" }),
    is_auto_generated: z.boolean().default(true),
    name_space_id: z.string({ required_error: "Namespace is required" }),
    auto_upload: z.boolean().default(false),
    number_of_clips: z.number().min(1).max(10).default(3),
    upload_time: z.string().optional(),
    speech_language: z.string({ required_error: "Speech language is required" }),
  }).refine(
      // if auth_upload false    ||  auto_upload true and upload time provided only then pass
      (data) => !data.auto_upload || (data.auto_upload && data.upload_time),
      {
          message: "Upload time is required",
          path: ["upload_time"]
      }
  )
 
export type ProjectInputType = z.infer<typeof projectFormSchema>;