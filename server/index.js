const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
require("./db");

const formSchema = new mongoose.Schema(
  {
    title: String,
    banner: String,
    questions: Array,
  },
  { collection: "forms" }
);

const submittedSchema = new mongoose.Schema(
  {
    formId: String,
    answers: Array,
  },
  { collection: "submitted" }
);

const FormData = mongoose.model("FormData", formSchema);
const SubmittedData = mongoose.model("SubmittedData", submittedSchema);
app.use(express.json());
app.use(cors());

app.post("/add-form", async (req, res) => {
  try {
    const { title, banner, questions } = req.body;

    const formData = new FormData({ title, banner, questions });
    await formData.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch {
    res.status(500).json({ error: "Error saving data" });
  }
});

app.post("/submit-form", async (req, res) => {
  try {
    const { formId, answers } = req.body;

    const submittedData = new SubmittedData({ formId, answers });
    await submittedData.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch {
    res.status(500).json({ error: "Error saving data" });
  }
});
app.get("/get-forms", async (req, res) => {
  try {
    // Retrieve all form data from the MongoDB collection
    const allFormData = await FormData.find();

    res.status(200).json(allFormData);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving data" });
  }
});

app.get("/get-form/:id", async (req, res) => {
  try {
    const formId = req.params.id;

    // Find the form by its ID in the MongoDB collection
    const formData = await FormData.findById(formId);

    if (!formData) {
      return res.status(404).json({ error: "Form not found" });
    }
    // Assuming formData.banner is a Buffer, convert it to base64
    const base64Banner = formData.banner.toString("base64");
    const formDataWithBase64 = { ...formData._doc, banner: base64Banner };
    res.status(200).json(formDataWithBase64);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving form" });
  }
});

const PORT = 3000;
app.use(express.static(path.join(__dirname + "/public")));
app.listen(PORT, () => {
  console.log(`Server is running`);
});
