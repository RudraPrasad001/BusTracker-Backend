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

  socket.on("start-tracking", ( BUS_ID ) => {
    console.log(BUS_ID)
    socket.join(BUS_ID);
    console.log(`👀 Client ${socket.id} is tracking bus ${BUS_ID}`);
  });

  socket.on("location-update", ({ busId, coords }) => {
    console.log(`📍 Location for bus ${busId.bus_number}:`, coords);
    io.to(busId.bus_number).emit("bus-location", coords);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

};

export default  initializeSocket ;
