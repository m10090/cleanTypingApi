const express = require("express");
const db = require("../util/db");
const Router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  res.status(400).json({ msg: "login Required" });
}
Router.post("/logSection", isAuthenticated, (req, res) => {
  console.log(req.body);
  db.logIt(req.body, req.user).then(()=>console.log("logged"));
  res.status(200).json({ msg: "ok" });
});
Router.get("/logout",isAuthenticated, (req, res, next) => {
  req.logout((err) => {
  });
  res.redirect(process.env.FRONTEND_URL+'?loggedIn=False');
});

Router.get("/profile", isAuthenticated, (req, res) => {
  res.json({ name: req.user.displayName, photo: req.user.photos[0].value });
});

module.exports = Router;
