import { Router } from "express";
import multer from "multer";
import openAIService from "../OpenAI/openAI.service.js";
import { ResponseHandler } from "../../utils/response.handlers.js";
import validateFileMiddleware from "../middleware/validateFileMiddleware.js";

const upload = multer(); 

export const openAIRouter = Router();

openAIRouter.post("/get-top3-tools-openai", upload.single('file'), validateFileMiddleware, async (req, res, next) => {
  try {
    const { requirement } = req;
    console.log("Requirement received in route:", requirement);
    const response = await openAIService.generateData(requirement);
    res.status(200).send(new ResponseHandler(response));
  } catch (error) {
    console.error("Error in route handler:", error);
    console.log(error);
    next(error);
  }
});
