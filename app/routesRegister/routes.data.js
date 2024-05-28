
import { RouteHandler } from "../../utils/response.handlers.js";
import { openAIRouter } from "../OpenAI/openAI.routes.js";
import { geminiRouter } from "../gemini/gemini.routes.js";
import {itsmRouter} from "../itsm/itsm.routes.js"

export const routes = [
  new RouteHandler('/gemini',geminiRouter),
  new RouteHandler('/itsm',itsmRouter),
  new RouteHandler('/openai',openAIRouter)
 
]