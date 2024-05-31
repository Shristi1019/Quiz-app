import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import InputField from "../Components/InputField";
import Btn from "../Components/Btn";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../config";
import { FaRegEnvelope } from "react-icons/fa";
import { MdOutlineLockOpen } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email && password && userType !== "Select") {
      try {
        const response = await fetch(`${url}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, userType }),
        });
        const data = await response.json();
        if (data.success) {
          if (userType === "admin") {
            navigate("/Admin");
          } else if (userType === "user") {
            navigate("/User");
          }
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred");
      }
    } else {
      alert("Please fill out all fields and select a user type");
    }
  };

  function validateEmail(email) {
    setEmailError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    }
    return true;
  }

  function handleEmailChange(value) {
    setEmail(value);
    validateEmail(value);
  }

  return (
    <>
      <Header />
      <section>
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="shadow-lg p-5 bg-white w-50">
            <form>
              <div className="text-center mb-4">
                <h2>Login</h2>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <FaRegEnvelope />
                </span>
                <InputField
                  width="200%"
                  type="email"
                  id="Email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <span className="text-danger">{emailError}</span>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <MdOutlineLockOpen />
                </span>
                <InputField
                  width="200%"
                  type="password"
                  id="Password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="Select">Select</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="text-center mb-3">
                <Btn title="Login" onClickBtn={handleLogin} />
              </div>
              <div className="d-flex justify-content-center">
                <p className="mx-4">
                  Not a member? <Link to="/Signup">Sign Up</Link>
                </p>
                <p className="mx-4">
                  Forgot password? <Link to="/ResetPassword">Reset</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
