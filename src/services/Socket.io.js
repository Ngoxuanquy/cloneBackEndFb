const http = require("http");
const socketIO = require("socket.io");

// Create your HTTP server instance with the appropriate options
const serverOptions = {}; // You can specify options here if needed
const server = http.createServer(serverOptions, (req, res) => {
  // Handle incoming HTTP requests if needed
  // For example, you could send a response or serve static files.
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!");
});

// Bind socket.io with the server instance
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("A client connected.");

  // Emitting a notification to the connected client after some event
  // For example, this could be triggered after processing some data or an action on the server-side.
  socket.emit("sendNotification", { message: "Hello, this is a notification!" });

  socket.on("disconnect", () => {
    console.log("A client disconnected.");
  });
});

module.exports = io
