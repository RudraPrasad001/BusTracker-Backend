import { Server } from "socket.io";

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const busTrackers = {};

  io.on("connection", (socket) => {
    console.log("🚐 A client connected:", socket.id);

    socket.on("start-tracking", (busId) => {
      socket.join(busId);
      console.log(`👀 Client ${socket.id} is tracking bus ${busId.bus_number}`);
    });

    socket.on("location-update", ({ busId, coords }) => {
      console.log(`📍 Location for,` , busId.bus_number,`:`, coords);
      io.to(busId).emit("bus-location", coords);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
};

export default  initializeSocket ;
