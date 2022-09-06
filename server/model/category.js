const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    lat: {
      type: String,
      required: true, 
    },
    lng: {
        type: String,
        required: true, 
    },
  },
);

module.exports = mongoose.model("Category", categorySchema);
