"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectBodySchema = void 0;
const zod_1 = require("zod");
exports.projectBodySchema = zod_1.z.object({
    project_name: zod_1.z.string({ required_error: "project name not provided." }),
    project_description: zod_1.z.string().optional(),
    video_url: zod_1.z.string().url({ message: "video url not provided." }),
    is_auto_generated: zod_1.z.boolean().default(true), //as of now only support auto_generated.
    name_space_id: zod_1.z.string({ required_error: "name space id not provided." }),
    auto_upload: zod_1.z.boolean().default(false),
    number_of_clips: zod_1.z.number().default(3),
    upload_time: zod_1.z.string().datetime().optional(),
    speech_language: zod_1.z.string(),
});
