import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      console.log(formData);

      const response = await API.post(
        "/auth/login",
        formData
      );

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }
  };



  return (
    <div className="app-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Sign in to access your task dashboard and manage your work easily.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />
          </div>

          <div className="button-row">
            <button type="submit">Login</button>
            <button type="button" onClick={() => navigate("/register")}>Create Account</button>
          </div>
        </form>

        <footer>
          New here? Tap <span>Create Account</span> to get started.
        </footer>
      </div>
    </div>
  );
}

export default Login;