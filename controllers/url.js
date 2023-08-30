// npm i shortid
const shortid = require('shortid');
const URL = require("../model/url")


async function handleGenerateNewShortUrl(req, res){
    const body = req.body;
    if (!body.url) return res.status(400).json("Enter a URL to be Shorten")
    const shortID = shortid();
        await URL.create({
            shortId: shortID,
            redirectUrl: body.url,
            visitedHistory: [],
            CreatedBy: req.user._id,
        });

    return res.render("home", {
        id: shortID,
    })

}

async function handleAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks: result.visitedHistory.length, analytics: result.visitedHistory})
}


module.exports = {
    handleGenerateNewShortUrl,
    handleAnalytics
}