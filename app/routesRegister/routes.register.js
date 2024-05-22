import helmet from "helmet";
import cors from "cors";
import { ResponseHandler } from "../../utils/response.handlers.js";
import { json } from "express";
import { routes } from "./routes.data.js";

export const routesRegister = (app)=>{

    app.use(helmet());
    app.use(cors());
    app.use(json());
    for (let route of routes) {
        app.use(route.path, route.router);
      }
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
      });
}