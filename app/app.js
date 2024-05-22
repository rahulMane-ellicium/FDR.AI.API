import express from "express";
import { routesRegister } from "./routesRegister/routes.register.js";
import { config } from "dotenv";
config();

const { PORT } = process.env;

export const startServer = async () => {
    try {
        const app = express();
        routesRegister(app);
        app.listen(PORT, () => {
            console.log(`SERVER STARTED ON ${PORT}`);
        });
    } catch (error) {
        console.error(error);
        console.error("COULD NOT START SERVER");
        process.exit(1);
    }
};
