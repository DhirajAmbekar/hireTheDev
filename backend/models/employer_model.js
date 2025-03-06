const mongoose = require("mongoose");

const Employer = new mongoose.Schema({
  company_name: {
    type: String,
    default: "",
    required: true,
  },
  company_email: {
    type: String,
    default: "",
    required: true,
  },
  company_phone: {
    type: String,
    default: "",
    required: true,
  },
  company_address: {
    type: String,
    default: "",
    required: true,
  },
  company_website: {
    type: String,
    default: "",
    required: true,
  },
  company_logo: {
    type: String,
    default: "",
    required: true,
  },
  company_description: {
    type: String,
    default: "",
    required: true,
  },
  company_industry: {
    type: String,
    default: "",
    required: true,
  },
  company_size: {
    type: String,
    default: "",
    required: true,
  },
  company_founded: {
    type: String,
    default: "",
    required: true,
  },
  company_specialities: {
    type: String,
    default: "",
    required: true,
  },
  company_type: {
    type: String,
    default: "",
    required: true,
  },
  company_links: {
    type: String,
    default: "",
    required: true,
  },
  company_facebook: {
    type: String,
    default: "",
    required: true,
  },
});

module.exports = mongoose.model("Employer", Employer);
