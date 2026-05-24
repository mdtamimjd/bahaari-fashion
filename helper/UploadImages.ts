"use server"
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function UploadImage(images:File[]) {
    try {
        if(!images) return {
            ok:false,
            message:"Image required!"
        }
        const imagesArray = []
        for(const image of images){
            const buffer = Buffer.from(await image.arrayBuffer());
            const upload = await new Promise<UploadApiResponse>((resolve,reject)=>{
                cloudinary.uploader.upload_stream({
                    folder:"bahaari/product"
                },(error,result)=>{
                    if(error) reject(error);
                    else resolve(result as UploadApiResponse)
                }).end(buffer)
            })
            const obj = {
                image_url:upload.secure_url,
                image_id:upload.public_id
            }
            imagesArray.push(obj)
        }
        return {
            ok:true,
            message:"Image upload successful",
            images:imagesArray
        }
    } catch (error:any) {
        return {
            ok:false,
            message:error.message
        }
    }
}
export async function DeleteImage(public_id:string) {
    try {
        if(!public_id) return;
        await cloudinary.uploader.destroy(public_id)
        return;
    } catch (error:any) {
        return {
            ok:false,
            message:error.message,
        }
    }
}