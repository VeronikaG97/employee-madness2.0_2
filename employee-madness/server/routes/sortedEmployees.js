const express = require("express");
const routerSortingEmployees = express.Router();
const Employee = require("../db/employee.model");

routerSortingEmployees.get("/name", async (req, res) => {
    const sortedEmployeesNames = await Employee.find({}).sort({name: 1});
    res.send(sortedEmployeesNames);
});
  
routerSortingEmployees.get("/level", async (req, res) => {
    const sortedEmployeesLevels = await Employee.find({}).sort({level: 1});
    res.send(sortedEmployeesLevels);
});
  
routerSortingEmployees.get("/position", async (req, res) => {
    const sortedEmployeesPositions = await Employee.find({}).sort({position: 1});
    res.send(sortedEmployeesPositions);
});

module.exports = routerSortingEmployees;