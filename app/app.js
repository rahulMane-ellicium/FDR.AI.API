import express from "express";
import { routesRegister } from "./routesRegister/routes.register.js";
import { config } from "dotenv";
import scheduleItsmDataSave from './gemini/scheduler.js'; 

config();

const { PORT } = process.env;

export const startServer = async () => {
    try {
        const app = express();
        routesRegister(app);
       scheduleItsmDataSave();

        app.listen(PORT, () => {
            console.log(`SERVER STARTED ON ${PORT}`);
        });
    } catch (error) {
        console.error(error);
        console.error("COULD NOT START SERVER");
        process.exit(1);
    }
};


