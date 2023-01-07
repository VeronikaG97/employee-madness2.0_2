// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EquipmentSchema = new Schema({
  name: String,
  type: String,
  amount: Number
});

const Equipment = mongoose.model("Equipment", EquipmentSchema)
module.exports = Equipment;