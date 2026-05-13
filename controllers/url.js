const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handelGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body) return res.status(400).json({ error: "URL is requird!" });

  const shortId = nanoid(8);

  const result = await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id, // Associate the URL with the authenticated user
  });

  return res.render("home", { shortId: result.shortId });
  // res.status(200).json({
  //   id: shortId,
  // });
}

async function handelRedirectToURL(req, res) {
  const shortId = req.params.shortId;
  if (!shortId) return res.status(400).json({ error: "Short ID is required!" });

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {},
      },
    },
    { returnDocument: "after" }, // to get the updated document after the update(it is new syntax for findOneAndUpdate, in older versions it is {new: true})
  );

  if (!entry) return res.status(404).send("Short URL not found!");

  res.redirect(entry.redirectURL); // redirecting to the original URL
}

async function handelGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  if (!shortId) return res.status(400).json({ error: "Short ID is required!" });

  const result = await URL.findOne({ shortId: shortId });
  if (!result) return res.status(404).json({ error: "Short URL not found!" });

  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    visitHistory: result.visitHistory,
  });
}

module.exports = {
  handelGenerateNewShortURL,
  handelRedirectToURL,
  handelGetAnalytics,
};
