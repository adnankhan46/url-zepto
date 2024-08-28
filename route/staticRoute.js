
const express = require('express');
const URL = require("../model/url");
const { restrictTo } = require('../middlewares/auth');
const router = express.Router();


router
.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res)=>{  // ADMIN's Route
  try {
  
    const allURLs = await URL.find().populate('CreatedBy'); // Populate the CreatedBy field with user details
    return res.render("admins-home", {urls: allURLs});
  } catch (error) {
    console.log(error)
  }
})

.get("/", restrictTo(["NORMAL", "ADMIN"]),async (req, res)=>{
  try {
  
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