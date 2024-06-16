const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/google" }),
  (_, res) => {
    res.redirect(process.env.FRONTEND_URL+'?loggedIn=true');
  },
);

module.exports = router;
