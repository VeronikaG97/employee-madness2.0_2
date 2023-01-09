const express = require("express");
const routerAttendence = express.Router();
const Employee = require("../db/employee.model");

routerAttendence.get("/missing", async (req, res) => {
    const missingEmployees = await Employee.find({attendence: false});
    res.send(missingEmployees);
    return missingEmployees;
});

routerAttendence.put("/:id", async (req, res, next) => {
    Employee.findByIdAndUpdate({_id: req.params.id}, req.body)
      .then(() => {
          Employee.findOne({_id: req.params.id})
          .then((employee) => {
              console.log(employee);
          });
      });
  });

module.exports = routerAttendence;