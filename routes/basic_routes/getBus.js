import pool from "../../utils/connectDB.js";

const getBus = async (req, res) => {
  try {
    const { number_plate } = req.params;

    const query = `
      SELECT
        b.bus_id,
        b.number_plate,
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
      WHERE b.number_plate = $1
      ORDER BY bs.sequence_number;
    `;

    const result = await pool.query(query, [number_plate]);

    if (result.rowCount === 0) {
      return res.json({
        success: false,
        message: "No bus found with that number plate",
      });
    }

    // We assume all rows belong to the same bus
    const row = result.rows[0];
    const bus = {
      bus_id: row.bus_id,
      number_plate:row.number_plate,
      bus_number: row.bus_number,
      route_name: row.route_name,
      stops: [],
    };

    result.rows.forEach((row) => {
      if (row.stop_id) {
        bus.stops.push({
          stop_id: row.stop_id,
          stop_name: row.stop_name,
          latitude: row.latitude,
          longitude: row.longitude,
          sequence_number: row.sequence_number,
        });
      }
    });

    res.json({
      success: true,
      bus,
    });
  } catch (e) {
    console.error("getBus error:", e);
    res.json({
      success: false,
      message: "Error fetching the bus from the database",
    });
  }
};

export default getBus;
