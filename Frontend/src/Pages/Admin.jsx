import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Header1 from "../Components/Header1";
import InputField from "../Components/InputField";
import Btn from "../Components/Btn";



function Admin() {
  const [questions, setQuestions] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [formData, setFormData] = useState({
    ques_no: null,
    subject_id: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correct_option: "",
  });

  useEffect(() => {
    fetchData(100);
  }, []);

  const fetchData = (subject) => {
    const url = `http://localhost:5000/?subject_id=${subject}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.data.filter(
          (question) => question.subject_id === subject
        );
        setQuestions(filteredData);
        setSubjectId(subject);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (formData.ques_no) {
      updateQuestion(formData);
    } else {
      addQuestion(formData);
    }
  };
  
  const updateQuestion = (formData) => {
    console.log(formData)
    fetch("http://localhost:5000/updateData", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Question updated successfully:", data);
        fetchData(subjectId); 
      })
      .catch((error) => console.error("Error updating question:", error));
  };
  

  const addQuestion = (formData) => {
    fetch("http://localhost:5000/addData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Question added successfully:", data);
        fetchData(subjectId); 
      })
      .catch((error) => console.error("Error adding question:", error));
  };

  
  const editRow = (ques_obj) => {
    setFormData({
      ques_no: ques_obj.ques_no,
      subject_id: ques_obj.subject_id,
      question: ques_obj.question,
      option1: ques_obj.option1,
      option2: ques_obj.option2,
      option3: ques_obj.option3,
      option4: ques_obj.option4,
      correct_option: ques_obj.correct_option,
    });
    console.log(formData);
  };

  return (
    <>
      <Header1 fetchData={fetchData} />
      <br></br>
      <br></br>

      <section className="m-5">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="shadow-lg p-5 bg-white w-50">
            <form onSubmit={handleFormSubmit} id="quizForm" className="form-body">
              <div className="text-center mb-4">
                <h2>{formData.ques_no ? "Edit Question" : "Add Question"}</h2>
              </div>
              <div className="mb-3">
                <InputField
                  type="text"
                  name="subject_id"
                  id="subjectSelect"
                  placeholder="Enter subject id"
                  value={formData.subject_id}
                  onChange={(e) =>
                    setFormData({ ...formData, subject_id: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="question"
                  className="form-control"
                  placeholder="Enter question"
                  rows="2"
                  cols="6"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <InputField
                    type="text"
                    name="option1"
                    placeholder="Enter option1"
                    value={formData.option1}
                    onChange={(e) =>
                      setFormData({ ...formData, option1: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <InputField
                    type="text"
                    name="option2"
                    placeholder="Enter option2"
                    value={formData.option2}
                    onChange={(e) =>
                      setFormData({ ...formData, option2: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <InputField
                    type="text"
                    name="option3"
                    placeholder="Enter option3"
                    value={formData.option3}
                    onChange={(e) =>
                      setFormData({ ...formData, option3: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <InputField
                    type="text"
                    name="option4"
                    placeholder="Enter option4"
                    value={formData.option4}
                    onChange={(e) =>
                      setFormData({ ...formData, option4: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mb-3">
                <InputField
                  type="text"
                  name="correct_option"
                  placeholder="Enter correct option"
                  value={formData.correct_option}
                  onChange={(e) =>
                    setFormData({ ...formData, correct_option: e.target.value })
                  }
                />
              </div>
              <div className="text-center">
                <Btn title={formData.ques_no ? "Save Changes" : "Add Question"} onClickBtn={handleFormSubmit} />
              </div>
            </form>
          </div>
        </div>
      </section>

      <section>
        <div style={{ margin: "5%" }}>
          <table className="table table-bordered table-striped">
            <thead className="text-center">
              <tr>
                <th>Question No</th>
                <th>Subject Id</th>
                <th>Question</th>
                <th>Option1</th>
                <th>Option2</th>
                <th>Option3</th>
                <th>Option4</th>
                <th>Correct answer</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr key={question.ques_no}>
                  <td>{question.ques_no}</td>
                  <td>{question.subject_id}</td>
                  <td>{question.question}</td>
                  <td>{question.option1}</td>
                  <td>{question.option2}</td>
                  <td>{question.option3}</td>
                  <td>{question.option4}</td>
                  <td>{question.correct_option}</td>
                  <td><Btn title="Edit" onClickBtn={() => editRow(question)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Admin;
