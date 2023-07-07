const express = require("express");
const request = require("request");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const axios = require("axios");

const studentRouter = require('./javascripts/warden/wardernRouters.js');
const { login, signup } = require("./javascripts/auth.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let authToken = '';

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/student", (req, res) => {
    const { name, regNo, block, roomNo, messType } = req.query;
    res.render("student/studDashboard", {
      name: name,
      regNo: regNo,
      block: block,
      roomNo: roomNo,
      messType: messType,
    });
  });
  
  

app.get("/student/auth", (req, res) => {
  res.render("templates/auth", { type: "STUDENT", message: "STARTING" });
});


app.post("/handleLogin", (req, res) => {
  login(req.body).then((status) => {
    console.log(status);
    if (status && status["message"] === "Logged in successfully") {
      const { name, regNo, block, roomNo, messType } = status.data;
      authToken = status.token; // Assign authToken value

      const redirectUrl = `/student?type=STUDENT&message=LOGGED_IN_SUCCESS&name=${name}&regNo=${regNo}&block=${block}&roomNo=${roomNo}&messType=${messType}`;
      res.redirect(redirectUrl);
    } else {
      res.render("templates/auth", {
        type: "STUDENT",
        message: "INVALID CREDENTIALS",
      });
    }
  });
});

  
  
  

app.post("/handleSignup", (req, res) => {
  signup(req.body).then((status) => {
    if (status) {
      res.redirect("student");
    } else {
      res.render("templates/auth", {
        type: "STUDENT",
        message: "INVALID CREDENTIALS",
      });
    }
  });
});

app.get("/student/leave", (req, res) => {
  res.render("student/studLeave");
});

app.get("/student/complaint", (req, res) => {
  res.render("student/studComplaint");
});

app.get("/student/course", (req, res) => {
  res.render("student/studCourse");
});

app.get("/student/event", (req, res) => {
  res.render("student/studEvent");
});

app.get("/student/mess", (req, res) => {
  res.render("student/studMess");
});

app.get("/student/room", (req, res) => {
    fetch("http://localhost:8000/api/v1/student/me", {
      headers: {
        "Authorization": `Bearer ${authToken}` // Include the authToken in the Authorization header
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.message === "success" && data.data) {
          const { name, regNo, block, roomNo, messType } = data.data;
  
          res.render("student/studRoom", {
            name: name,
            regNo: regNo,
            roomNo: roomNo,
            block: block,
            messType: messType,
          });
        } else {
          // Handle error or invalid response
          res.render("error", { message: "Invalid response from API" });
        }
      })
  });
  
  app.use('/warden', studentRouter);
  

app.listen(3210, function () {
  console.log("Server started at port 3210");
});

module.exports = authToken;
