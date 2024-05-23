import { Router } from "express";
import { ResponseHandler } from "../../utils/response.handlers.js";
import upload from "../../config/multer.config.js"
import itsmServices from "../itsm/itsm.service.js"


export const itsm=Router();


itsm.post('/upload-excel', upload.single('file'), async (req, res, next) => {
    try {
        const { buffer } = req.file;
      const response = await itsmServices.readExcelFileFromBuffer(buffer);
      res.status(200).send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  });


