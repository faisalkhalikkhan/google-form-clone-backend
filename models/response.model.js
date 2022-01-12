const mongoose = require("mongoose");

const newResponse = mongoose.Schema({
  formId: String,
  responseData: {}
});
const Responses = mongoose.model("Responses", newResponse);

module.exports = Responses;
