const express = require("express");
const routerFilterEmployees = express.Router();
const Employee = require("../db/employee.model");

routerFilterEmployees.get("/name/:name", async (req, res) => {
    const foundEmployee = await Employee.find({name: {$regex: "^" + req.params.name, $options: "i"}});
    res.send(foundEmployee);
});

routerFilterEmployees.get("/level/:level", async (req, res) => {
    const filteredEmployeeLevel = await Employee.find({level: {$regex:"^" + req.params.level, $options: "i"}});
    res.send(filteredEmployeeLevel);
});
  
routerFilterEmployees.get("/position/:position", async (req, res) => {
    const filteredEmployeePosition = await Employee.find({position: {$regex: "^" + req.params.position, $options: "i"}});
    res.send(filteredEmployeePosition);
});

module.exports = routerFilterEmployees;