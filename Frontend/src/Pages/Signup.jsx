import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import InputField from "../Components/InputField";
import Btn from "../Components/Btn";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../Components/Popup";
import emailjs from "emailjs-com";
emailjs.init("kKIambsfOLJmdUnRy");



function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);


  function validateEmail(email) {
    setEmailError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    }
    return true;
  }

  function validateUsername(username) {
    setUsernameError("");
    if (username.trim() === "") {
      setUsernameError("Username cannot be empty");
      return false;
    }
    return true;
  }

  function validatePassword(password) {
    setPasswordError("");
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  }

  function validateConfirmPassword(confirmPassword) {
    setConfirmPasswordError("");
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    return true;
  }

  function handleUsernameChange(value) {
    setUsername(value);
    validateUsername(value);
  }

  function handleEmailChange(value) {
    setEmail(value);
    validateEmail(value);
  }

  function handlePasswordChange(value) {
    setPassword(value);
    validatePassword(value);
  }

  function handleConfirmPasswordChange(value) {
    setConfirmPassword(value);
    validateConfirmPassword(value);
  }

  function sendOTP() {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if (username.trim() === "") {
      setUsernameError("Username cannot be empty");
      return;
    }

    var minm = 100000;
    var maxm = 999999;
    var randomNumber = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    console.log(randomNumber);

    let subject = "OTP";
    let body = "Your OTP is: " + randomNumber;

    emailjs
      .send("service_gj583bh", "template_avkmwcz", {
        to_email: "shristigangwar925@gmail.com",
        to_name: username,
        subject: subject,
        body: body,
      })
      .then(
        (response) => {
          alert("OTP sent successfully. Please check your mail.");
          insertOTPIntoDB(username, email, randomNumber);
        },
        (error) => {
          alert("Error sending OTP: " + error.text);
        }
      );
  }

  function insertOTPIntoDB(username, email, otp) {
    fetch(`http://localhost:5000/insertData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        otp: otp,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
    console.log("OTP inserted into DB:", otp);
  }

  function verifyOTP() {
    if (otp.trim() === "") {
      setOtpError("Please enter OTP");
      return;
    }

    setOtpError("");

    fetch("http://localhost:5000/verifyOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          //alert("OTP verified successfully.");
          setOtpVerified(true);
        } else {
          alert("Invalid OTP. Please try again.");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  function handleRegister() {
    if (
      validatePassword(password) &&
      validateConfirmPassword(confirmPassword)
    ) {
      fetch("http://localhost:5000/updatePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Account Created successfully:", data);
          setPopupMessage("Account Created Successfully");
          setShowPopup(true);
        })
        .catch((error) => {
          console.error("Error updating password:", error);
          alert("Error creating account. Please try again.");
        });
    } else {
      alert("Please fill in all required fields correctly");
    }
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  const handlePopup = ()=>{
    setShowPopup(false)
    navigate("/Login")
  }

  return (
    <>
      <Header />
      <section style={{ marginTop: "50px" }}>
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="shadow-lg p-5 bg-white w-50">
            <form>
              <div id="section1" style={{ display: otpVerified ? "none" : "block" }}>
                <div className="text-center mb-4">
                  <h2>Register</h2>
                </div>
                <div className="input-group mb-3">
                  <InputField
                    width="200%"
                    type="text"
                    id="Username"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <span className="text-danger">{usernameError}</span>
                </div>

                <div className="input-group mb-3">
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

                <div className="text-center mb-3">
                  <Btn title="Send OTP" onClickBtn={sendOTP} />
                </div>

                <div className="input-group mb-3">
                  <InputField
                    width="200%"
                    type="number"
                    id="OTP"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <span className="text-danger">{otpError}</span>
                </div>

                <div className="text-center mb-3">
                  <Btn title="Verify OTP" onClickBtn={verifyOTP} />
                </div>
              </div>
              <div id="section2" style={{ display: otpVerified ? "block" : "none" }}>
                <div className="text-center mb-4">
                  <h2>Choose Password</h2>
                </div>
                <div className="input-group mb-3">
                  <InputField
                    width="200%"
                    type="password"
                    id="Password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <span className="text-danger">{passwordError}</span>
                </div>

                <div className="input-group mb-3">
                  <InputField
                    width="200%"
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>
                      handleConfirmPasswordChange(e.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <span className="text-danger">{confirmPasswordError}</span>
                </div>

                <div className="text-center mb-3">
                  <Btn title="Register" onClickBtn={handleRegister} />
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <p className="mx-4">
                  Already have an account? <Link to="/Login">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        {showPopup && (
        <Popup message={popupMessage} onClose={() => handlePopup()} />
      )}
      </section>
      <Footer />
    </>
  );
}

export default Signup;
