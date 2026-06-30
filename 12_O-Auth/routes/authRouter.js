import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

// START GOOGLE LOGIN
router.get(
  "/google/login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

// GOOGLE CALLBACK
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/profile");
  },
);

router.get("/profile", (req, res, next) => {
  res.render("profile", { user: req.user });
});

export default router;
