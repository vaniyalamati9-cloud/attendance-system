import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../App.css";

function Attendance(){

const students=[
{ enroll:"BCA001", name:"Rahul Sharma" },
{ enroll:"BCA002", name:"Amit Patel" },
{ enroll:"BCA003", name:"Priya Shah" },
{ enroll:"BCA004", name:"Neha Gupta" },
{ enroll:"BCA005", name:"Rohan Verma" }
];

const [attendance,setAttendance] = useState({});
const [loading,setLoading] = useState(false);

// handle selection
const handleChange = (enroll,status)=>{
  setAttendance(prev => ({
    ...prev,
    [enroll]:status
  }));
};

// submit attendance
const submitAttendance = async ()=>{

const token = localStorage.getItem("token");

const date = new Date().toISOString().split("T")[0];

const records = students.map(student => ({
  enroll: student.enroll,
  name: student.name,
  status: attendance[student.enroll] || "Absent"
}));

console.log("SENDING:", {records,date});

try{

setLoading(true);

const res = await fetch("https://attendance-system-5w0n.onrender.com/api/attendance/save", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({ records, date })
});

const data = await res.json();

console.log("RESPONSE:", data);

if(res.ok){
  alert("Attendance Submitted ✅");
  setAttendance({});
}else{
  alert(data.message || "Error ❌");
}

}catch(err){
console.log(err);
alert("Server error ❌");
}

setLoading(false);

};

return(

<div className="dashboard-container">

<Sidebar/>

<div className="dashboard-content">

<h1>Mark Attendance</h1>

<div className="attendance-grid">

{students.map((student,index)=>(

<div key={index} className="student-card">

<div className="student-info">
<strong>{student.enroll}</strong>
<p>{student.name}</p>
</div>

<div className="attendance-options">

<label>
<input
type="radio"
name={student.enroll}
checked={attendance[student.enroll]==="Present"}
onChange={()=>handleChange(student.enroll,"Present")}
/>
Present
</label>

<label>
<input
type="radio"
name={student.enroll}
checked={attendance[student.enroll]==="Absent"}
onChange={()=>handleChange(student.enroll,"Absent")}
/>
Absent
</label>

</div>

</div>

))}

</div>

<button className="submit-btn" onClick={submitAttendance} disabled={loading}>
{loading ? "Submitting..." : "Submit Attendance"}
</button>

</div>

</div>

);

}

export default Attendance;