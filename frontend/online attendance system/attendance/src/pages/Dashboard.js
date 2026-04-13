import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { io } from "socket.io-client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard(){

const [present, setPresent] = useState(0);
const [absent, setAbsent] = useState(0);
const [loading, setLoading] = useState(true);

const fetchData = async () => {

const token = localStorage.getItem("token");

try{

const res = await fetch("http://localhost:5000/api/attendance", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const data = await res.json();

if(Array.isArray(data) && data.length > 0){

  const latest = data[data.length - 1];

  let p = 0, a = 0;

  latest.records.forEach(s => {
    if(s.status === "Present") p++;
    else a++;
  });

  setPresent(p);
  setAbsent(a);

}else{
  setPresent(0);
  setAbsent(0);
}

}catch(err){
console.log(err);
}

setLoading(false);
};

useEffect(()=>{

fetchData();

const socket = io("http://localhost:5000");

socket.on("attendanceUpdated", ()=>{
  fetchData();
});

return ()=> socket.disconnect();

},[]);

const pieData = {
labels: ["Present", "Absent"],
datasets: [{
  data: [present, absent],
  backgroundColor: ["#22c55e", "#f97316"]
}]
};

const barData = {
labels: ["Present", "Absent"],
datasets: [{
  label: "Students",
  data: [present, absent],
  backgroundColor: ["#22c55e", "#f97316"]
}]
};

return(

<div className="dashboard-container">

<Sidebar/>

<div className="dashboard-content">

<h1 style={{color:"#fff"}}>Dashboard</h1>

<div className="cards">

<div className="card total">
<h3>Total Students</h3>
<p>{present + absent}</p>
</div>

<div className="card present">
<h3>Present</h3>
<p>{present}</p>
</div>

<div className="card absent">
<h3>Absent</h3>
<p>{absent}</p>
</div>

</div>

{loading ? (
<h2 style={{color:"white"}}>Loading...</h2>
) : (

<div style={{display:"flex",gap:"40px",marginTop:"40px"}}>

<div style={{width:"300px"}}>
<Pie data={pieData}/>
</div>

<div style={{width:"400px"}}>
<Bar data={barData}/>
</div>

</div>

)}

</div>
</div>

);
}

export default Dashboard;