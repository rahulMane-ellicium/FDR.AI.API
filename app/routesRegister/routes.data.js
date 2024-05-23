import { RouteHandler } from "../../utils/response.handlers.js";
import { geminiRouter } from "../gemini/gemini.routes.js";
import {itsm} from "../itsm/itsm.routes.js"

export const routes = [
  new RouteHandler('/gemini',geminiRouter),
  new RouteHandler('/readExcelFile',itsm),
 
]