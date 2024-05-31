const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
const pool = require("./db");



// TO SHOW DATA IN TABLE
app.get("/", async (request, response) => {
    const client = await pool.connect();
    const subject_id = request.query.subject_id;
    try {
        const res = await client.query(`select * from quiz_data where subject_id = $1;` ,[subject_id]);
        response.json({data: res.rows, message: "Data found"});
    } catch (e) {
        response.json({
            error:e,
        });
    } finally {
        console.log("hey");
        client.release();
    }
});




// TO SHOW QUES AND OPTIONS IN QUIZ 
app.post("/subject", async (request, response) => {
  const client = await pool.connect();
  const subject_id = parseInt(request.body.subject_id) ;
console.log(parseInt(request.body.subject_id), "************")
  try {
    const res = await client.query(`select * from quiz_data where subject_id = $1`, [subject_id]);
    response.json({ data: res.rows, message: "Data found" });
  } catch (e) {
    response.json({
      error: e,
    });
  } finally {
    console.log("Quiz===")
    client.release();
  }
});




// TO INSERT QUES AND OPTIONS INTO DB FROM ADMIN FORM
app.post("/addData", async (req, res) => {
    const client = await pool.connect();
    const subject_id = req.body.subject_id;
    const question = req.body.question;
    const option1 = req.body.option1;
    const option2 = req.body.option2;
    const option3 = req.body.option3;
    const option4 = req.body.option4;
    const correct_option = req.body.correct_option;

    try {
        const result = await client.query(`INSERT INTO quiz_data (subject_id, question, option1, option2, option3, option4, correct_option)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`, [subject_id, question, option1, option2, option3, option4, correct_option]);
        res.json({data:res.rows, message : 'insert data'});
    } catch (e) {
        res.json({
            error: e.message,
        });
    } finally {
        console.log("Question Added");
        client.release();
    }
});



// TO UPDATE QUES AND OPTIONS INTO DB FROM ADMIN FORM
app.put("/updateData", async (req, res) => {
  const client = await pool.connect();
  const { ques_no, subject_id, question, option1, option2, option3, option4, correct_option } = req.body;

  try {
    const result = await client.query(
      `UPDATE quiz_data SET subject_id = $1, question = $2, option1 = $3, option2 = $4, option3 = $5, option4 = $6, correct_option = $7 WHERE ques_no = $8`,
      [subject_id, question, option1, option2, option3, option4, correct_option, ques_no]
    );
    res.status(200).json({ message: "Question updated successfully" });
  } catch (e) {
    console.error("Error updating question:", e);
    res.status(500).json({ error: "An error occurred while updating question." });
  } finally {
    client.release();
    console.log('Question updated');
  }
});



// TO VALIDATE LOGIN CREDENTIALS
app.post("/login", (req, res) => {
    const { email, password, userType } = req.body;
  
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }
  
    const query =
      "SELECT * FROM users WHERE email = $1 AND password = $2";
    pool.query(query, [email, password], (error, result) => {
      if (error) {
        console.error("Error executing query:", error);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error." });
      }
  
      if (result.rowCount > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Login successful." });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password." });
      }
    });
    console.log("Logged In=====");
  });



// TO INSERT USERNAME, EMAIL, & OTP ON CLICKING SENT OTP BUTTON 
app.post("/insertData", async (req, res) => {
  const client = await pool.connect();
  const username = req.body.username;
  const email = req.body.email;
  const otp = req.body.otp;
  try {
  const result = await client.query(`INSERT INTO users (username, email, otp)
      VALUES ($1, $2, $3)`, [username, email, otp]);
      res.json({
        message: "Data added successfully",
      });
    } catch (e) {
      res.json({
        error: e.message,
      });
    } finally {
      console.log("hey");
      client.release();
    }
  });



// TO VERIFY OTP ON CLICKING VALIDATE OTP
  app.post("/verifyOTP", async (req, res) => {
    const { username, email, otp } = req.body;
    const query = `SELECT * FROM users WHERE username = $1 AND email = $2 AND otp = $3`;
    pool.query(query, [username, email, otp], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ success: true, message: "OTP verified successfully." });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid OTP. Please try again." });
    }
    });
  });




  // TO VERIFY OTP ON CLICKING VALIDATE OTP In FORGOT PASSWORD PAGE 
  app.post("/verifyOTP1", async (req, res) => {
    const { email, otp } = req.body;
    const query = `SELECT * FROM users WHERE  email = $1 AND otp = $2`;
    pool.query(query, [email, otp], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ success: true, message: "OTP verified successfully." });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid OTP. Please try again." });
    }
    });
  });




// TO UPDATE ON CLICKING SIGN UP BUTTON 
app.put("/updatePassword", async (req, res) => {
  const { email, password } = req.body;

  try {
      const result = await pool.query(`UPDATE users SET password = $1 WHERE email = $2`, [password, email]);
      res.json({
          message: "Password updated successfully. Login to continue.",
      });
  } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'An error occurred while updating password.' });
  } finally {
    console.log("Password Updated");
  }
});



// TO UPDATE OTP IN FORGOT PASSWORD PAGE
app.put("/updateOTP", async (req, res) => {
  const { email, otp } = req.body;

  try {
      const result = await pool.query(`UPDATE users SET otp = $1 WHERE email = $2`, [otp, email]);
      res.json({
          message: "OTP updated successfully.",
      });
  } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'An error occurred.' });
  } finally {
    console.log("OTP Updated = = =");
  }
});



// TO CHECK IF EMAIL EXISTS OR NOT
app.post("/checkMail", async (req, res) => {
  const {email} = req.body;
  try {
    const result = await pool.query(`select * from users where email = $1`, [email]);
    res.json({ exists: result.rowCount > 0});
  } catch (error){
    console.error('Error checking email:', error);
    res.status(500).json({error: 'An error occured.'});
  }
});


app.listen(port, ()=> {
    console.log(`Server is running on this port ${port}`);
});
