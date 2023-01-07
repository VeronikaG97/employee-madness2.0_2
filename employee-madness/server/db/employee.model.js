// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  attendence: Boolean,
  equipment: String

});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
