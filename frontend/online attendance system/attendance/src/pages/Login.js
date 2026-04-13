import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const navigate = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();

setLoading(true);

try{

const res = await fetch("https://attendance-system-5w0n.onrender.com/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ username, password })
});

const data = await res.json();

console.log("Response:", data);


if (data.token) {
  // 🔐 Save token
  localStorage.setItem("token", data.token);

  // 👥 Save role
  localStorage.setItem("role", data.role);

  alert("Login Successful ✅");

  // 🔄 Redirect
  if(data.role === "admin"){
    navigate("/dashboard");
  } else {
    navigate("/report");
  }

} else {
  alert("Invalid username or password ❌");
}

}catch(err){
console.log("Error:", err);
alert("Server not responding ❌");
}

setLoading(false);

};

return(
<div className="login-container">

<h1>Attendance System Login</h1>

<form onSubmit={handleLogin}>

<input
type="text"
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit" disabled={loading}>
{loading ? "Logging in..." : "Login"}
</button>

</form>

</div>
);
}

export default Login;