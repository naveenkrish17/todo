var express = require("express");
var router = express.Router();
const mongo_api = require("../db/users.db");

router.post("/login", async function (req, res, next) {
  if (!req.body) {
    res.status(404).send({ message: "Please login with credentials" });
  } else {
    let users = await mongo_api.userLogin(req.body);
    if (users) {
      res.status(200).send({ message: "Login successfull" });
    } else {
      res.status(404).send({ message: "Login Failed, Please register" });
    }
  }
});

router.post("/register", async function (req, res, next) {
  if (!req.body) {
    res.status(404).send({ message: "Please register with credentials" });
  } else {
    if (!req.body.emailId.includes("@") || !req.body.password.length >= 8) {
      res.status(400).send({
        message: "Please enter a valid email and an 8 character password",
      });
    } else {
      let users = await mongo_api.userRegister(req.body);
      if (users) {
        res.status(201).send({ message: "Registeration successfull" });
      } else {
        res.status(500).send({
          message: "Registeration Failed, Please refresh and try again",
        });
      }
    }
  }
});

module.exports = router;
