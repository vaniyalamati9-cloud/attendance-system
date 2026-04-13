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
// GET
router.get("/", async (req, res) => {
  try {
    const data = await Attendance.find();

    let result = [];

    data.forEach(day => {
      if (day.records && Array.isArray(day.records)) {
        result = result.concat(day.records.map(r => ({
          rollNo: r.rollNo,
          name: r.name,
          status: r.status,
          date: day.date
        })));
      }
    });

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching attendance" });
  }
});

module.exports = router;
