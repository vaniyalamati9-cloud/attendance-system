const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// SAVE
router.post("/save", async (req,res)=>{

const {records,date} = req.body;

const newData = new Attendance({records,date});
await newData.save();

const io = req.app.get("io");
if(io) io.emit("attendanceUpdated");

res.json({message:"Saved"});

});

// GET
router.get("/", async (req,res)=>{
const data = await Attendance.find();
res.json(data);
});

module.exports = router;
