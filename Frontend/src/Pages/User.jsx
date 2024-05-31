import React from "react";
import Footer from "../Components/Footer";
import Header1 from "../Components/Header1"; 


function User() {
  
  return (
    <div>
      <Header1 />
      <br></br>
      <br></br>
      <br></br>

      <section>
        <div className="m-5 shadow-lg p-5">
          <div className="text-center">
            <h2>Instructions</h2>
          </div>
          <div className="mt-4">
            <p>Here are the instructions for attempting this quiz:</p>
            <ul>
              <li>Read each question carefully.</li>
              <li>Select the best answer.</li>
              <li>
                You can navigate between questions using the Previous and Next
                buttons.
              </li>
              <li>
                If you select an incorrect response for a question, you can try
                again until you get the correct response. If you retake the
                quiz.
              </li>
              <li>
                The total score for the quiz is based on your responses to all
                questions.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default User;
