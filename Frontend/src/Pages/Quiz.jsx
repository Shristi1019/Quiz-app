import React, { useEffect, useState, useContext } from "react";
import Btn from "../Components/Btn";
import { Card, CardHeader } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";


function Quiz() {
  const { id, index } = useParams();
  const { selectedOption, setSelectedOption, questions, setQuestions } = useContext(UserContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(parseInt(index, 10) || 0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizData(id);
  }, [id]);

  const fetchQuizData = async (subject_id) => {
    if (id === "HTML") {
      subject_id = 100;
    } else if (id === "CSS") {
      subject_id = 200;
    } else if (id === "Python") {
      subject_id = 300;
    } else {
      subject_id = 400;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/subject?subject_id=${subject_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subject_id }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuestions(data.data);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handlePreview = () => {
    navigate("/Preview");
  };

  const handleOptionChange = (event) => {
    const questionIndex = currentQuestionIndex;
    setSelectedOption({
      ...selectedOption,
      [questionIndex]: event.target.value,
    });
  };
  const currentQuestion = questions[currentQuestionIndex];

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ margin: "130px" }}
      >
        <Card className="shadow-lg">
          <CardHeader
            style={{
              backgroundColor: "#029499",
              color: "white",
              textAlign: "center",
            }}
          >
            {id} Quiz
          </CardHeader>
          <Card.Body className="p-4">
            <div>
              <Card.Title className="mb-2">
                Q{currentQuestionIndex + 1}/{questions.length}:{" "}
                {currentQuestion.question}
              </Card.Title>
              <div className="p-2">
                <label>
                  <input
                    type="radio"
                    name="option"
                    value={currentQuestion?.option1}
                    checked={
                      selectedOption[currentQuestionIndex] ===
                      currentQuestion?.option1
                    }
                    onChange={handleOptionChange}
                  />
                  {currentQuestion?.option1}
                </label>
              </div>
              <div className="p-2">
                <label>
                  <input
                    type="radio"
                    name="option"
                    value={currentQuestion?.option2}
                    checked={
                      selectedOption[currentQuestionIndex] ===
                      currentQuestion?.option2
                    }
                    onChange={handleOptionChange}
                  />
                  {currentQuestion?.option2}
                </label>
              </div>
              <div className="p-2">
                <label>
                  <input
                    type="radio"
                    name="option"
                    value={currentQuestion.option3}
                    checked={
                      selectedOption[currentQuestionIndex] ===
                      currentQuestion.option3
                    }
                    onChange={handleOptionChange}
                  />
                  {currentQuestion.option3}
                </label>
              </div>
              <div className="p-2 mb-4">
                <label>
                  <input
                    type="radio"
                    name="option"
                    value={currentQuestion.option4}
                    checked={
                      selectedOption[currentQuestionIndex] ===
                      currentQuestion.option4
                    }
                    onChange={handleOptionChange}
                  />
                  {currentQuestion.option4}
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <Btn
                onClickBtn={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                title="Previous"
              />
              <Btn
                onClickBtn={isLastQuestion ? handlePreview : handleNextQuestion}
                title={isLastQuestion ? "Preview" : "Next"}
                disabled={isLastQuestion && currentQuestionIndex === 0}
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Quiz;
