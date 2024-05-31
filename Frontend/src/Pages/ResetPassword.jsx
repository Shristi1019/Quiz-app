import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Btn from "../Components/Btn";
import InputField from "../Components/InputField";
import Popup from "../Components/Popup";
import emailjs from "emailjs-com";
emailjs.init("kKIambsfOLJmdUnRy");



function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [currentSection, setCurrentSection] = useState("section-1");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  

  function validateEmail(email) {
    setEmailError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
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

  function enableSubmit() {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    fetch(`http://localhost:5000/checkMail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
          setEmailError("");
          sendOTP();
          setCurrentSection("section-3");
        } else {
          setEmailError("This email-id does not exist.");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  function sendOTP() {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
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
        subject: subject,
        body: body,
      })
      .then(
        (response) => {
          alert("OTP sent successfully. Please check your mail.");
          updateOTPIntoDB(email, randomNumber);
        },
        (error) => {
          alert("Error sending OTP: " + error.text);
        }
      );
  }

  function updateOTPIntoDB(email, otp) {
    fetch(`http://localhost:5000/updateOTP`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }

  function verifyOTP() {
    fetch("http://localhost:5000/verifyOTP1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, otp: otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCurrentSection("section-2");
        } else {
          alert("Invalid OTP. Please try again.");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  function updatePassword() {
    if (
      validatePassword(password) &&
      validateConfirmPassword(confirmPassword)
    ) {
      fetch("http://localhost:5000/updatePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          setPopupMessage("Password Updated Successfully");
          setShowPopup(true);
        })
        .catch((error) => console.error("Error:", error));
    } else {
      alert("Please fill the password correctly.");
    }
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
      <br></br>
      <section>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="text-center">
              <img
                src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg?w=740"
                alt="Forgot Password"
                width="70%"
                height="80%"
              />
            </div>
            <div className="shadow-lg p-5 bg-white w-50">
              {currentSection === "section-1" && (
                <form>
                  <div className="text-center mb-3">
                    <h3>Forgot Password?</h3>
                  </div>
                  <div className="text-center mb-4">
                    <p>Enter your email to reset password</p>
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
                    <Btn title="Submit" onClickBtn={enableSubmit} />
                  </div>
                  <div className="text-center">
                    <Link to="/Login">Back to Login</Link>
                  </div>
                </form>
              )}
              {currentSection === "section-3" && (
                <form>
                  <div className="text-center mb-4">
                    <h3>Enter OTP</h3>
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
                    <Btn title="Validate OTP" onClickBtn={verifyOTP} />
                  </div>
                  <div className="text-center">
                    <Link to="/Login">Back to Login</Link>
                  </div>
                </form>
              )}
              {currentSection === "section-2" && (
                <form>
                  <div className="text-center mb-4">
                    <h3>Reset Your Password</h3>
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
                  <div className="text-center mb-2">
                    <Btn title="Update Password" onClickBtn={updatePassword} />
                  </div>
                  <div className="text-center">
                    <Link to="/Login">Back to Login</Link>
                  </div>
                </form>
              )}
            </div>
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

export default ResetPassword;
