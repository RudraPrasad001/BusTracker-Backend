import pool from "../../utils/connectDB.js";
const manageRoutes = async(req,res)=>{
  const { bus_id, stops } = req.body;
try{
  if (!bus_id || !stops || !Array.isArray(stops)) {
    return res.status(401).json({ success:false,message: "Missing bus_id or stops array" });
  }

  
      // Delete old mappings for this bus
      await pool.query("DELETE FROM bus_stops WHERE bus_id = $1", [bus_id]);

      if (stops.length === 0) {
        return res.json({ message: "All stops cleared for this bus." });
      }

      // Build bulk insert dynamically
      const values = [];
      const placeholders = [];

      stops.forEach((stop, idx) => {
        const i = idx * 3; // 3 placeholders per row
        placeholders.push(`($${i + 1}, $${i + 2}, $${i + 3})`);
        values.push(bus_id, stop.stop_id, stop.sequence_number);
      });

      const insertQuery = `
        INSERT INTO bus_stops (bus_id, stop_id, sequence_number)
        VALUES ${placeholders.join(", ")}
      `;

      await pool.query(insertQuery, values);

      res.json({ 
        success:true,
        message: "Stops assigned to bus successfully." });

    } 
   catch (err) {
    console.error(err);
    res.status(500).json({ success:false,message: "Server error" });
  }
}
export default manageRoutes;