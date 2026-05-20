import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });



  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  // HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      console.log(formData);

      const response = await API.post(
        "/auth/register",
        formData
      );

      console.log(response.data);

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }
  };



  return (
    <div className="app-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Open your task workspace and start organizing your daily goals.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={handleChange}
            />
          </div>

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
            <button type="submit">Register</button>
            <button type="button" onClick={() => navigate(-1)}>Back</button>
          </div>
        </form>

        <footer>
          Already have an account? Use the back button to return to login.
        </footer>
      </div>
    </div>
  );
}

export default Register;