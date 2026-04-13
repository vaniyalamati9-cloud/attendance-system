require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const app = express();

// DB connect
connectDB();

// server
const server = http.createServer(app);

// socket
const io = new Server(server, {
  cors: { origin: "*" }
});

app.set("io", io);

// middleware
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);

// test
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// socket
io.on("connection", (socket) => {
  console.log("User connected");
});

// start
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.get("/create-admin", async (req, res) => {
  const bcrypt = require("bcrypt");
  const User = require("./models/User");

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    username: "admin",
    password: hashedPassword,
    role: "admin"
  });

  res.send("Admin created ✅");
});