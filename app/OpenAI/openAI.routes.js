import { Router } from "express";
import OpenAIService from "../OpenAI/openAI.service.js"
import { ResponseHandler } from "../../utils/response.handlers.js";

export const OpenAIRouter=Router()

OpenAIRouter.get("/save-itsm-data",async(req,res,next)=>{
    try{
        const filePath = 'ITSMDATA.xlsx';
        const response=await OpenAIService.GenerateData(filePath);

        res.status(200).send(new ResponseHandler(response));
    }catch(error){
        console.log(error);
        next(error)
    }
})


OpenAIRouter.get("/get-all-itsm-tools",async(req,res,next)=>{
    try{

     
        const response=await OpenAIService.readExcelToJson();
        res.status(200).send(new ResponseHandler(response))
    }catch(error){
        next(error)
    }
})

