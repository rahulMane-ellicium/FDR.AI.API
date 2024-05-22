import { RouteHandler } from "../../utils/response.handlers.js";
import { geminiRouter } from "../gemini/gemini.routes.js";

export const routes = [
  new RouteHandler('/gemini',geminiRouter)
]