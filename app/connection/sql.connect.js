import sql from 'mssql';
import { config } from '../../config/db.config.js';

export let pool;
export const connectToSql = async()=>{
    try {
        pool = new sql.ConnectionPool(config)
        await pool.connect();
        console.log("CONNECTED TO DATABASE!");
        return pool;
    } catch (error) {
        console.log("Db connection failed !!")
        throw error
    }
}