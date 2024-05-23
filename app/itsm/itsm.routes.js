import { Router } from "express";
import { ResponseHandler } from "../../utils/response.handlers.js";
import multer from 'multer';

import itsmServices from "../itsm/itsm.service.js"



export const itsmRouter=Router();



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

itsmRouter.post('/upload-excel', upload.single('file'), async (req, res, next) => {
    try {
      const buffer = req.file.buffer; 
      const response = await itsmServices.readExcelFileFromBuffer(buffer);
      res.status(200).send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  });



