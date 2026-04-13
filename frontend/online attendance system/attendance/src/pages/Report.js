import React from "react";
import Sidebar from "../components/Sidebar";

function Report(){

const records = JSON.parse(localStorage.getItem("attendanceRecords")) || [];

return(

<div className="dashboard-container">

<Sidebar/>

<div className="dashboard-content">

<h1>Attendance Report</h1>

<table className="student-table">

<thead>
<tr>
<th>Enrollment</th>
<th>Name</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{records.map((r,index)=>(

<tr key={index}>
<td>{r.enroll}</td>
<td>{r.name}</td>
<td>{r.status}</td>
</tr>

))}

</tbody>

</table>

</div>

</div>

);

}

export default Report;