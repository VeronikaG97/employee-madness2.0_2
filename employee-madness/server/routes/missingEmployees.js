const express = require("express");
const routerMissingEmployees = express.Router();
const Employee = require("../db/employee.model");

routerMissingEmployees.get("/missing", async (req, res) => {
    const missingEmployees = await Employee.find({attendence: false});
    res.send(missingEmployees);
    return missingEmployees;
})
module.exports = routerMissingEmployees;