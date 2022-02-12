const express = require("express");
const Aha = require("../models/aha");
const multer = require("multer");

var upload = multer({ dest: "uploads/" });

const router = express();

router.get("/upload", async (req, res) => {
  res.render("upload");
});

router.post("/upload", upload.single("image"), async (req, res) => {
  //   console.log(req.userData);
  const post = new Aha(req.body.post);
  console.log(req.file);
  post.images = {
    url: req.file.path,
  };
  await post.save();
  console.log(post);

  res.redirect("/show");
});

router.get("/show", async (req, res) => {
  const thriller = await Aha.find({ genre: "thriller" });
  const comedy = await Aha.find({ genre: "comedy" });
  console.log(thriller);
  res.render("show", { thriller, comedy });
});

module.exports = router;
