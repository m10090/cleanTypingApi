const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/google" }),
  (req, res) => {
    res.redirect(process.env.FRONTEND_URL+'?loggedIn=True');
  },
);

module.exports = router;
