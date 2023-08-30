
const express = require('express');
const cookieParser = require("cookie-parser")
const {restrictToLoggedInUserOnly, checkAuth} = require("./middlewares/auth")

const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const URL = require("./model/url")


// Routes
const urlRoute = require("./route/url");
const staticRoute = require("./route/staticRoute");
const userRoute = require("./route/user")

const app = express()
const port = 3000
mongoose.connect("mongodb://127.0.0.1:27017/urlShortner").then(()=>{console.log("DB Connected")});

app.set("view engine", "ejs");

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly,urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);



app.get("/url/:shortId", async (req, res)=>{
    const shortId = req.params.shortId;
    try{
  const entry = await URL.findOneAndUpdate(
    {shortId}, {$push: {visitedHistory: {timeStamp: Date.now()}}}
  );
  if (entry) {
    res.redirect(entry.redirectUrl);
  } else {
    // Handle the case where no matching entry was found
    res.status(404).send("URL not found");
  }
  } catch(err){console.log(err)}
})



app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})