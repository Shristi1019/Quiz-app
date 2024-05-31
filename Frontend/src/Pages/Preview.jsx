import React, { useContext, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import Btn from "../Components/Btn";

function Preview() {
  const { questions, selectedOption } = useContext(UserContext);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();


  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (question.correct_option === selectedOption[index]) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowScore(true);
    console.log("Score", correctAnswers);
  };
  
  const handleSubjectName = (subjectId) => {
    switch (subjectId) {
      case 100:
        return "HTML";
      case 200:
        return "CSS";
      case 300:
        return "Python";
      default:
        return "JavaScript";
    }
  };

  const handleEditAnswer = (index) => {
    const subjectId = questions[index].subject_id;
    const subjectName = handleSubjectName(subjectId);
    navigate(`/${subjectName}/${index}`);
  };

  
  return (
    <>
      <div className="container" style={{ display: showScore ? "none" : "block" }}>
        <div>
          <h3 className="m-5 text-center">Preview</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Question</th>
                <th>Selected Option</th>
                <th>Edit Answer</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td>{question.question}</td>
                  <td>{selectedOption[index]}</td>
                  <td>
                    <Btn title="Edit" onClickBtn={() => handleEditAnswer(index)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="m-5 d-flex justify-content-center">
          <Btn title="Submit" onClickBtn={() => calculateScore()}/>
        </div>
      </div>
      {showScore && (
        <div className="container" style={{ margin: "220px auto", border: "2px solid #29878a", backgroundColor: "#34A9AD", width: "40%" }}>
          <h3 className="m-4 text-center" style={{ color: "white" }}>
            Your Score: {score}
          </h3>
          <div className="mb-4 text-center">
            <Link to="/Login">
              <Button style={{ backgroundColor: "#34A9AD" }}>Log Out</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Preview;

