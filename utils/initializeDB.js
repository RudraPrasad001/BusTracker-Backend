import pool from "./connectDB.js";
import fs from 'fs';
const initializeDB = async()=>{


    //Bus Table
    const busSql = fs.readFileSync('./schemas/Bus.sql').toString();
    pool.query(busSql)
     .then(async () => {console.log('✅ Bus file executed');await execStops()})
    .catch(err => console.error('❌ Error executing Bus SQL file:', err));

    const execStops = async()=>{

    const stopSql = fs.readFileSync('./schemas/Stop.sql').toString();
    pool.query(stopSql)
     .then(() => console.log('✅ Stop file executed'))
    .catch(err => console.error('❌ Error executing Stop SQL file:', err));
    await execBusStops();
    }
  const execBusStops = async()=>{
     //Bus Stop Table
    const busStopSql = fs.readFileSync('./schemas/Bus_Stop.sql').toString();
    pool.query(busStopSql)
     .then(() => console.log('✅ Bus Stop file executed'))
    .catch(err => console.error('❌ Error executing Bus Stop SQL file:', err));
    await execDriver();
    }
    
    const execDriver = async()=>{
    //Driver Table
    const driverSql = fs.readFileSync('./schemas/Driver.sql').toString();
    pool.query(driverSql)
     .then(() => console.log('✅ Driver file executed'))
    .catch(err => console.error('❌ Error executing Driver SQL file:', err));
    await execLocation();
    }

    const execLocation = async()=>{
    //Stop Table

    //Location Table
    const locationSql = fs.readFileSync('./schemas/Location.sql').toString();
    pool.query(locationSql)
     .then(() => console.log('✅ Location file executed'))
    .catch(err => console.error('❌ Error executing Location SQL file:', err));
    }
}
export default initializeDB;