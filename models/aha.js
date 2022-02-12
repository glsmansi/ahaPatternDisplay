const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const ahaSchema = new Schema(
  {
    images: ImageSchema,
    movieName: String,
    genre: String,
  },
  opts
);

const Aha = mongoose.model("Aha", ahaSchema);
module.exports = Aha;
