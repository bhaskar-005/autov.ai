import { Response } from "express";

export class response {
    static error(res:Response, error:string, status_code:number, data?:any){
      return res.status(status_code).json({
        error_message: error,
        data: data ? data : null,
        success:false
      })
    }

    static message(res:Response, message:string, status_code:number, data?:any){
        return res.status(status_code).json({
            message: message,
            data: data ? data : null,
            success: true,
        })
    }
}