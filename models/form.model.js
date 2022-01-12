const mongoose = require("mongoose");

let d = new Date();
const newForm = mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  questions: [],
  visible: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: d.toLocaleDateString("en-US"),
  },
});

const NetLink_Form = mongoose.model("form", newForm);
module.exports = NetLink_Form;
