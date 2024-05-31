import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Btn from "../Components/Btn";

const HomePage = () => {
  return (
    <>
      <Header/>
      <br></br>
      <br></br>
      <div className="container shadow-lg d-flex justify-content-center mt-5">
        <div className="m-5 mx-4">
          <div className="mt-5">
            <h3 style={{ color: "#247375" }}>
              Unlock Your Knowledge with Our Online Quiz!
            </h3>
            <p style={{ color: "#247375" }}>
              Test your skills and learn something new with our interactive quiz
              platform. Challenge yourself and win prizes!
            </p>
            <Btn title="Read More"/>
          </div>
        </div>
        <div className="ms-auto">
          <img
            src="https://img.freepik.com/free-vector/online-certification-illustration-concept_23-2148573425.jpg?w=740"
            width="80%"
            height="95%"
            alt="Quiz Illustration"
          />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default HomePage;
