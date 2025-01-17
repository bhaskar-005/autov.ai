import { z } from 'zod';

export const projectBodySchema = z.object({
    project_name: z.string({ required_error: "project name not provided."}),
    project_description: z.string().optional(),
    video_url: z.string().url({ message: "video url not provided."}),
    is_auto_generated: z.boolean().default(true),   //as of now only support auto_generated.
    name_space_id: z.string({ required_error: "name space id not provided."}),
    auto_upload: z.boolean().default(false),
    number_of_clips: z.number().default(3),
    upload_time:z.string().datetime().optional(),

    speech_language: z.string(),
})