import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const navigate = useNavigate();

const handleLogin = (e) => {
e.preventDefault();

setLoading(true);

fetch("http://localhost:5000/api/auth/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ username, password })
})
.then(res => res.json())
.then(data => {

console.log("Response:", data); // 🔍 DEBUG

if (data.success) {

  // 🔐 Save token (optional)
  localStorage.setItem("token", data.token || "");

  // 🔥 SAVE ROLE (MOST IMPORTANT)
  localStorage.setItem("role", data.role);

  alert("Login Successful");

  // 🔥 Redirect based on role
  if(data.role === "admin"){
    navigate("/dashboard");
  } else {
    navigate("/report");
  }

} else {
  alert("Invalid username or password");
}

setLoading(false);

})
.catch(err => {
console.log("Error:", err);
alert("Server not responding");
setLoading(false);
});
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