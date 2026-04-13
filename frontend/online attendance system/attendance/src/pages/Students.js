import React from "react";
import Sidebar from "../components/Sidebar";
import "../App.css";

function Students(){

const students = [

{ enroll:"BCA001", name:"Rahul Sharma" },
{ enroll:"BCA002", name:"Amit Patel" },
{ enroll:"BCA003", name:"Priya Shah" },
{ enroll:"BCA004", name:"Neha Gupta" },
{ enroll:"BCA005", name:"Rohan Verma" },
{ enroll:"BCA006", name:"Anjali Mehta" },
{ enroll:"BCA007", name:"Karan Singh" },
{ enroll:"BCA008", name:"Sneha Joshi" },
{ enroll:"BCA009", name:"Vikram Desai" },
{ enroll:"BCA010", name:"Pooja Nair" },
{ enroll:"BCA011", name:"Arjun Kapoor" },
{ enroll:"BCA012", name:"Meera Iyer" },
{ enroll:"BCA013", name:"Sanjay Kumar" },
{ enroll:"BCA014", name:"Aisha Khan" },
{ enroll:"BCA015", name:"Dev Patel" },
{ enroll:"BCA016", name:"Ritika Sharma" },
{ enroll:"BCA017", name:"Aditya Mishra" },
{ enroll:"BCA018", name:"Nisha Yadav" },
{ enroll:"BCA019", name:"Varun Jain" },
{ enroll:"BCA020", name:"Kavita Reddy" }

];

return(

<div className="dashboard-container">

<Sidebar/>

<div className="dashboard-content">

<h1>Student List</h1>

<table className="student-table">

<thead>
<tr>
<th>Enrollment</th>
<th>Name</th>
</tr>
</thead>

<tbody>

{students.map((student,index)=>(

<tr key={index}>
<td>{student.enroll}</td>
<td>{student.name}</td>
</tr>

))}

</tbody>

</table>

</div>

</div>

);

}

export default Students;