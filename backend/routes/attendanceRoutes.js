const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// SAVE
router.post("/save", async (req, res) => {

try{

const { records, date } = req.body;

console.log("RECEIVED:", records);

const newAttendance = new Attendance({ date, records });

await newAttendance.save();

// socket
const io = req.app.get("io");
if(io){
  io.emit("attendanceUpdated");
}

res.json({ message: "Saved successfully" });

}catch(err){
console.log(err);
res.status(500).json({ message: "Error" });
}

});

// GET
router.get("/", async (req, res) => {

const data = await Attendance.find();
res.json(data);

});

module.exports = router;