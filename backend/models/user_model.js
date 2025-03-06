const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  email: {
    type: String,
    default: "",
    unique: true,
    sparse: true,
    required: true,
  },
  phone: {
    type: String,
    default: "",
    unique: true,
    sparse: true,
  },
  role: {
    type: String,
    enum: ["employee", "employer", "admin"],
    default: "employee",
  },
});

module.exports = mongoose.model("Users", Users);
