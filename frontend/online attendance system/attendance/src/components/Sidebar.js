import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Sidebar(){

const role = localStorage.getItem("role");
const navigate = useNavigate();

// 👤 Demo user name (you can make dynamic later)
const username = role === "admin" ? "Admin User" : "Student User";

// 🔓 Logout
const handleLogout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  navigate("/");
};

return(

<div className="sidebar">

{/* 👤 PROFILE SECTION */}
<div className="profile-box">
  <div className="avatar">
    {username.charAt(0)}
  </div>
  <h3>{username}</h3>
  <p className="role">{role}</p>
</div>

<hr style={{margin:"15px 0", opacity:"0.2"}}/>

{/* 📌 NAVIGATION */}
<Link to="/dashboard">Dashboard</Link>

{role === "admin" && (
<>
  <Link to="/students">Students</Link>
  <Link to="/attendance">Mark Attendance</Link>
</>
)}

<Link to="/report">Report</Link>

{/* 🔓 LOGOUT */}
<button className="logout-btn" onClick={handleLogout}>
Logout
</button>

</div>

);

}

export default Sidebar;