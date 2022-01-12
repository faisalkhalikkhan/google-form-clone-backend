const express = require("express");
const router = express.Router();

const NetLink_Form = require("../models/form.model");

router.get("/:id", (req, res) => {
  NetLink_Form.findOne({ _id: req.params.id })
    .then((response) => res.status(201).json(response))
    .catch((e) => console.log(e));
});

router.get("/all/:id", (req, res) => {
  NetLink_Form.find({ userId: req.params.id })
    .then((response) => res.status(201).json(response))
    .catch((e) => console.log(e));
});

router.put("/update/:id", (req, res) => {
  const body = req.body;
  NetLink_Form.findByIdAndUpdate({ _id: req.params.id }, body)
    .then((response) => res.status(201).json(response))
    .catch((e) => console.log(e));
});

router.delete("/delete/:id", (req, res) => {
  NetLink_Form.findByIdAndDelete({ _id: req.params.id })
    .then((response) => res.status(201).json(response))
    .catch((e) => console.log(e));
});

router.put("/live/:id", (req, res) => {
  NetLink_Form.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: { visible: true },
    }
  )
    .then((response) => res.status(201).json(response))
    .catch((e) => console.log(e));
});
router.put("/unlive/:id", (req, res) => {
  NetLink_Form.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: { visible: false },
    }
  )
    .then((response) => res.status(201).json(response))
    .catch((e) => console.log(e));
});

router.post("/create-form", (req, res) => {
  const body = req.body;
  const newForm = new NetLink_Form(body);
  newForm
    .save()
    .then((response) => res.status(201).json(response))
    .catch((e) => console.log(e));
});

router.post("/edit-form/:id", (req, res) => {
  const formId = req.params.id;
  const body = req.body;
  NetLink_Form.findOneAndUpdate(
    { _id: formId },
    {
      $push: { question: body },
    }
  )
    .then((response) => res.status(201).json(response))
    .catch((e) => console.log(e));
});

router.get("/groupby/:id", (req, res) => {
    NetLink_Form.aggregate([
      { $match: { userId: req.params.id } },
      { $group: { _id: "$createdAt", total: { $sum: 1 } } },
    ])
      .then((respon) => res.status(200).json(respon))
      .catch((e) => res.status(500).json({ message: e.message }));
});

router.post("/find/:title", (req, res) => {
  NetLink_Form.find({ title: req.params.title })
    .then((response) => res.status(200).json(response))
    .catch((e) => res.status(500).json({ message: e.message }));
});

module.exports = router;
