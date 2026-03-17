import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  //const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      console.log("FULL RESPONSE:", res);
      console.log("DATA:", res.data);
      console.log("TOKEN:", res.data.token);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");

    }
  };

 return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Timetable System</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;