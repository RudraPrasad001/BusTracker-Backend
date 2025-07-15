import { Pool } from "pg";
import { config } from "dotenv";
config();
        let database = process.env.DATABASE;
        let user = process.env.USER;
        let password = process.env.PASSWORD;
        let port = process.env.PORT;
        const pool = new Pool({database,user,password,port});
export default pool;