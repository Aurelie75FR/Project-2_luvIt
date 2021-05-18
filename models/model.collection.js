const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema(
  {
    name: String,
    image: {type:String, default:"https://images.unsplash.com/photo-1500673587002-1d2548cfba1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
    description: String,
    cards: [{type: Schema.Types.ObjectId, ref: "card"}],
    user_id : {type: Schema.Types.ObjectId, ref: "user"}
  },
  {
    timestamps: true,
  }
);

const CollectionModel = mongoose.model("collection", CollectionSchema);
module.exports = CollectionModel;
