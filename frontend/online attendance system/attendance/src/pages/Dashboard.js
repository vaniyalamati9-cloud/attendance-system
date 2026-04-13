import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { io } from "socket.io-client";

function Dashboard(){

const [present,setPresent] = useState(0);
const [absent,setAbsent] = useState(0);

const fetchData = async () => {

try{

const token = localStorage.getItem("token");

const res = await fetch("https://attendance-system-5w0n.onrender.com/api/attendance", {
  headers:{
    Authorization:`Bearer ${token}`
  }
});

const data = await res.json();

console.log("API DATA:", data);

if(Array.isArray(data) && data.length > 0){

  const latest = data[data.length-1];

  let p=0,a=0;

  latest.records.forEach(s=>{
    if(s.status==="Present") p++;
    else a++;
  });

  setPresent(p);
  setAbsent(a);

}else{
  setPresent(0);
  setAbsent(0);
}

}catch(err){
console.log("Error:", err);
}

};

useEffect(()=>{

fetchData();

// ✅ SOCKET FIXED URL
const socket = io("https://attendance-system-5w0n.onrender.com");

socket.on("attendanceUpdated", ()=>{
  console.log("Realtime update 🚀");
  fetchData();
});

return ()=>socket.disconnect();

},[]);

return(
<div className="dashboard-container">
<Sidebar/>
<div className="dashboard-content">

<h1>Dashboard</h1>

<div className="cards">

<div className="card total">
<h3>Total</h3>
<p>{present+absent}</p>
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

</div>
</div>
);
}

export default Dashboard;