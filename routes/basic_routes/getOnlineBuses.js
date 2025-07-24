import pool from "../../utils/connectDB.js";
const getOnlineBuses = async(req,res)=>{
    try{
    const result = await pool.query(`
      SELECT
        b.bus_id,
        b.bus_number,
        b.route_name,
        b.number_plate,        -- ✅ include this line
        b.is_online,
        s.stop_id,
        s.stop_name,
        s.latitude,
        s.longitude,
        bs.sequence_number
      FROM buses b
      LEFT JOIN bus_stops bs ON b.bus_id = bs.bus_id
      LEFT JOIN stops s ON bs.stop_id = s.stop_id
      WHERE b.is_online=true
      ORDER BY b.bus_id, bs.sequence_number;`);

    if(result.rowCount===0) throw new Error("No buses Online");
    
    const busesMap = {};

    result.rows.forEach(row => {
      const busId = row.bus_id;

      if (!busesMap[busId]) {
        busesMap[busId] = {
          bus_id: busId,
          is_online:row.is_online,
          bus_number: row.bus_number,
          route_name: row.route_name,
          number_plate: row.number_plate,
          stops: []
        };
      }

      if (row.stop_id) {
        busesMap[busId].stops.push({
          stop_id: row.stop_id,
          stop_name: row.stop_name,
          latitude: row.latitude,
          longitude: row.longitude,
          sequence_number: row.sequence_number
        });
      }
    });

    const buses = Object.values(busesMap);

    res.json({ success: true, buses });
    }
    catch(e){
        res.json({success:false,message:e.message});
    }
}
export default getOnlineBuses;