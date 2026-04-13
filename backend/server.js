require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const app = express();

// ✅ Connect DB
connectDB();

// ✅ Create server
const server = http.createServer(app);

// ✅ Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.set("io", io);

// ✅ Middleware
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ✅ Create Admin (SAFE version)
app.get("/create-admin", async (req, res) => {
  try {
    const bcrypt = require("bcrypt");
    const User = require("./models/User");

    const existing = await User.findOne({ username: "admin" });

    if (existing) {
      return res.send("Admin already exists ✅");
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      username: "admin",
      password: hashedPassword,
      role: "admin"
    });

    res.send("Admin created ✅");

  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating admin ❌");
  }
});

// ✅ Socket connection
io.on("connection", (socket) => {
  console.log("User connected");
});

// ✅ Start server (IMPORTANT FIX)
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});