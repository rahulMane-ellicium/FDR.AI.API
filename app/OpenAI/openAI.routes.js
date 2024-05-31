
import { Router } from "express";
import multer from "multer";
import openAIService from "../OpenAI/openAI.service.js";
import { ResponseHandler } from "../../utils/response.handlers.js";

const upload = multer(); 

export const openAIRouter = Router();



openAIRouter.post('/get-top3-tools-openai', upload.single('requirementsFile'), async (req, res, next) => {
    try {
        const requirementsFilePath = req.file; 
        const featuresFilePath = 'PROJECT_features.xlsx';  
        const response = await openAIService.generateData(requirementsFilePath, featuresFilePath); // Pass file paths
        
        res.status(200).send(new ResponseHandler(response));
    } catch (error) {
        console.log(error);
        next(error);
    }
});