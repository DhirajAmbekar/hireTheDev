const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  pname: { type: String, required: true },
  pdescription: { type: String, required: true },
});

const jobSchema = new mongoose.Schema({
  jobRole: { type: String, required: true },
  jobDesc: { type: String, required: true },
  jobSkills: [String],
  jobSalary: { type: Number, required: true },
});

const userSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["employee", "employer"], required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    otpVerified: { type: Boolean, default: false },
    name: { type: String },
    position: { type: String },
    skills: [String],
    projects: [projectSchema],
    companyName: { type: String },
    companyUrl: { type: String },
    jobVacancies: [jobSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
