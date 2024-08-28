// Importing needed Files and Modules
const express = require('express');
const cookieParser = require("cookie-parser")
const { checkForAuthentication,
  restrictTo} = require("./middlewares/auth")
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const URL = require("./model/url");
const urlRoute = require("./route/url");        // Importing Routes
const staticRoute = require("./route/staticRoute");
const userRoute = require("./route/user");

// App and MongoDB
const app = express()
const port = 3000
mongoose.connect("mongodb://127.0.0.1:27017/urlShortner").then(()=>{console.log("Database Connected")});


// EJS
app.set("view engine", "ejs");

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]),urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);


///////// Get URL
app.get("/url/:shortId", async (req, res)=>{
    const shortId = req.params.shortId;
    try{
  const entry = await URL.findOneAndUpdate(
    {shortId}, {$push: {visitedHistory: {timeStamp: Date.now()}}}
  );
  if (entry) {
    res.redirect(entry.redirectUrl); // entry.redirectUrl -> entry will call find and get redirectUrl from Model URL
  } else {
    // Handle the case where no matching entry was found
    res.status(404).send("URL not found");
  }
  } catch(err){console.log(err)}
})



app.listen(port, () => {
  console.log(`Server Running at port ${port}`)
})