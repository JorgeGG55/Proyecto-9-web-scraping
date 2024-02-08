const mongoose = require("mongoose");

const championSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    rol: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "champions",
  }
);

const Champion = mongoose.model("champions", championSchema, "champions");
module.exports = Champion;
