const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

const clientPort = 3000;
const serverPort = 5000;
const clientUrl = "http://localhost:" + clientPort + "/";
const serverUrl = "http://localhost:" + serverPort + "/";

mongoose.connect("mongodb://localhost:27017/shortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", async (req, res) => {
  let allUrls = await ShortUrl.find();
  res.send(allUrls);
});

app.post("/shorten", async (req, res) => {
  const url = req.body.url;
  const urlFound = await ShortUrl.findOne({ full: url });
  if (urlFound !== null) return;
  let shortId = nanoid(8);
  await ShortUrl.create({
    full: url,
    short: shortId,
    shortenedUrl: serverUrl + shortId,
  });
  let dbData = await ShortUrl.findOne({ full: url });
  let data = dbData.toObject();
  // data.shortenedUrl = serverUrl + dbData.short;
  res.send(data);
});

app.get("/:shortened", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortened });
  if (shortUrl == null) return res.redirect(clientUrl);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || serverPort);
