import { Router } from "express";
import openAIService from "../OpenAI/openAI.service.js"
import { ResponseHandler } from "../../utils/response.handlers.js";

export const openAIRouter=Router()

openAIRouter.get("/Get-top3-tools-Openai",async(req,res,next)=>{
    try{
        const filePath = 'ITSMDATA.xlsx';
        const response=await openAIService.GenerateData(filePath);

        res.status(200).send(new ResponseHandler(response));
    }catch(error){
        console.log(error);
        next(error)
    }
})




