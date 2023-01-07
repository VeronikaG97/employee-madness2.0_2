const express = require("express");
const routerSortingEquipment = express.Router();
const Equipment = require("../db/equipment.model");

routerSortingEquipment.get("/name", async (req, res) => {
    const sortedEquipmentNames = await Equipment.find({}).sort({name: 1});
    res.send(sortedEquipmentNames);
});
  
routerSortingEquipment.get("/type", async (req, res) => {
    const sortedEquipmentType = await Equipment.find({}).sort({type: 1});
    res.send(sortedEquipmentType);
});
  
routerSortingEquipment.get("/amount", async (req, res) => {
    const sortedEquipmentAmount = await Equipment.find({}).sort({amount: 1});
    res.send(sortedEquipmentAmount);
});

module.exports = routerSortingEquipment;