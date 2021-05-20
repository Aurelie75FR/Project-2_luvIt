const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    name: String,
    image: {type: String, default: "https://images.unsplash.com/photo-1593419335262-3963ec1c4972?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80"},
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