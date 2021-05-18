const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    name: String,
    image: String,
    description: String,
    links:[String],
    // add ref to collection
  },
  {
    timestamps: true,
  }
);

const CardModel = mongoose.model("card", CardSchema);
module.exports = CardModel;