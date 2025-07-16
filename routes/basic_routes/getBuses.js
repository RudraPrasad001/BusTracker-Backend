import pool from "../../utils/connectDB.js";
const getBuses = async (req, res) => {
    try {
      const query = `
        SELECT
          b.bus_id,
          b.bus_number,
          b.route_name,
          s.stop_id,
          s.stop_name,
          s.latitude,
          s.longitude,
          bs.sequence_number
        FROM buses b
        LEFT JOIN bus_stops bs ON b.bus_id = bs.bus_id
        LEFT JOIN stops s ON bs.stop_id = s.stop_id
        ORDER BY b.bus_id, bs.sequence_number;
      `;

      const result = await pool.query(query);

      // Organize rows into buses with stops array
      const busesMap = {};

      result.rows.forEach(row => {
        const busId = row.bus_id;

        if (!busesMap[busId]) {
          busesMap[busId] = {
            bus_id: busId,
            bus_number: row.bus_number,
            route_name: row.route_name,
            stops: []
          };
        }

        if (row.stop_id) { // check for null in case a bus has no stops yet
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

      res.json({success:true,
        buses});

    }
    catch(e){
        res.json({
            success:false,
            message:"Error fetching the database"
        })
    } 

};

export default getBuses;
