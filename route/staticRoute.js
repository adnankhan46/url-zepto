
const express = require('express');
const URL = require("../model/url")
const router = express.Router();


router
.get("/", async (req, res)=>{
  try {
    if(!req.user){return res.redirect("/login")};
    const allURLs = await URL.find({ CreatedBy: req.user._id });
    return res.render("home", {urls: allURLs});
  } catch (error) {
    console.log(error)
  }

  })

.get("/signup", (req, res)=>{
  res.render("signup")
})
.get("/login", (req, res)=>{
  res.render("login")
})

module.exports = router;