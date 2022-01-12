const router = require("express").Router();
const path = require("path");
const Responses = require("../models/response.model");

router.post("/:id", (req, res) => {
  const body = {
    responseData: req.body,
    formId: req.params.id,
  };
  const newResponse = new Responses(body);
  newResponse
    .save(body)
    .then((response) => {
      res.sendFile(path.join(__dirname, "/index.html"));
      // res.status(201).json({ Success: true })
    })
    .catch((e) => console.log(e));
});

router.get("/data-for-you/:id", (req, res) => {
  const id = req.params.id;
  Responses.find({ formId: id })
    .then((r) => res.status(200).json(r))
    .catch((e) => res.status(500).json({ Message: e.message }));
});

module.exports = router;
