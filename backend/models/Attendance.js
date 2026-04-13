const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: String,
  records: [
    {
      enroll: String,
      name: String,
      status: String
    }
  ]
});

module.exports = mongoose.model("Attendance", attendanceSchema);