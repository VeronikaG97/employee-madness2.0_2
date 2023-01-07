const express = require("express");
const routerFilterEquipment = express.Router();
const Equipment = require("../db/equipment.model");

routerFilterEquipment.get("/name/:name", async (req, res) => {
    const foundEquipmentName = await Equipment.find({name: {$regex: "^" + req.params.name, $options: "i"}});
    res.send(foundEquipmentName);
});

routerFilterEquipment.get("/type/:type", async (req, res) => {
    const filteredEquipmentType = await Equipment.find({type: {$regex:"^" + req.params.type, $options: "i"}});
    res.send(filteredEquipmentType);
});
  
//To Do, fix filter
routerFilterEquipment.get("/amount/:amount", async (req, res) => {
    const filteredEquipmentAmount = await Equipment.find({amount: req.params.amount});
    res.send(filteredEquipmentAmount);
});

module.exports = routerFilterEquipment;