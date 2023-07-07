const express = require('express');
const router = express.Router();

let authToken  = require("../../app");

const { loginWarden } = require("../auth.js");
// Define routes for warden
router.get('/', (req, res) => {
  const { id, name, block} = req.query;
    res.render("warden/wardDashboard", {
      id: id,
      name: name,
      block: block
    });
});

router.get('/auth', (req,res) => {
    res.render("warden/wardAuth");
})

router.get("/leave", (req,res) => {
    res.render("warden/wardLeave");
})

router.get("/mess", (req,res) => {
    res.render("warden/wardMess");
})

router.get("/complaint", (req,res) => {
    res.render("warden/wardComplaint");
})

router.get("/room", (req,res) => {
    res.render("warden/wardRoom");
})

router.get
router.get("/create", (req,res) => {
  res.render("warden/wardCreate");
});

router.post("/handleLogin", (req, res) => {
    loginWarden(req.body).then((status) => {
      console.log(status);
      if (status && status["message"] === "Warden Logged In") {
        const { name, block } = status.data;
        authToken = status.token;
  
        const redirectUrl = `/warden?type=WARDEN&message=LOGGED_IN_SUCCESS&name=${name}&block=${block}`;
        res.redirect(redirectUrl);
      } else {
        res.render("warden/wardAuth", {
          type: "WARDEN",
          message: "INVALID CREDENTIALS",
        });
      }
    });
  });
  


module.exports = router;
