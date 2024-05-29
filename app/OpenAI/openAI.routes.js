// import { Router } from "express";
// import openAIService from "../OpenAI/openAI.service.js"
// import { ResponseHandler } from "../../utils/response.handlers.js";

// export const openAIRouter=Router()

// openAIRouter.get("/Get-top3-tools-Openai",async(req,res,next)=>{
//     try{
//         const filePath = 'ITSMDATA.xlsx';
//         const response=await openAIService.GenerateData(filePath);

//         res.status(200).send(new ResponseHandler(response));
//     }catch(error){
//         console.log(error);
//         next(error)
//     }
// })


import { Router } from "express";
import openAIService from "../OpenAI/openAI.service.js"
import { ResponseHandler } from "../../utils/response.handlers.js";

export const openAIRouter=Router()

openAIRouter.get('/Get-top3-tools-Openai', async (req, res, next) => {
    try {
        const requirementsFilePath = 'ITSMDATA.xlsx';  // The input requirements file
        const featuresFilePath = 'PROJECT_features.xlsx';      // The file containing tool details
        
        const response = await openAIService.GenerateData(requirementsFilePath, featuresFilePath);
        
        res.status(200).send(new ResponseHandler(response));
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export default openAIRouter;



 