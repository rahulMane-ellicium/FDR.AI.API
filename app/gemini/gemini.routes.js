import { Router } from "express";
import geminiService from "./gemini.service.js";
import { ResponseHandler } from "../../utils/response.handlers.js";

export const geminiRouter = Router();

geminiRouter.get("/save-itsm-data",async(req,res,next)=>{
    try {
        const response = await geminiService.getItsmData();
        res.status(200).send(new ResponseHandler(response));
    } catch (error) {
        console.log(error)
        next(error);
    }
});

geminiRouter.get("/get-all-itsm-tool",async(req,res,next)=>{
    try {
        const response = await geminiService.readExcelToJson();
        res.status(200).send(new ResponseHandler(response));
    } catch (error) {
        next(error)
    }
})

