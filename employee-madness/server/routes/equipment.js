const express = require("express");
const routerEquipment = express.Router();
const Equipment = require("../db/equipment.model");

routerEquipment.get("/", async (req, res) => {
    const equipment = await Equipment.find().sort({ created: "desc" });
  return res.json(equipment);
});

routerEquipment.get("/:id", async (req, res) => {
  const id = req.params.id;
  const equipment = await Equipment.findOne({_id: id}).lean();
  return res.json(equipment);
});

routerEquipment.post("/", async (req, res, next) => {
  const equipmentItem = req.body;

  try {
    const saved = await Equipment.create(equipmentItem);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

routerEquipment.patch("/:id", async (req, res, next) => {
  const equipmentItem = req.body;
  try {
    const updated = await Equipment.findOneAndUpdate(equipmentItem);
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

routerEquipment.delete("/:id", async (req, res, next) => {
  Equipment.findByIdAndDelete({_id: req.params.id}, req.body)
});

module.exports = routerEquipment;