
import { Router } from "express";
import multer from "multer";
import openAIService from "../OpenAI/openAI.service.js";
import { ResponseHandler } from "../../utils/response.handlers.js";

const upload = multer(); 

export const openAIRouter = Router();

openAIRouter.post("/get-top3-tools-openai",upload.single('file'),async(req,res,next)=>{
    try{
        const {file} = req
        const response=await openAIService.generateData(file);

        res.status(200).send(new ResponseHandler(response));
    }catch(error){
        console.log(error);
        next(error)
    }
})


