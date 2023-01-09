const express = require("express");
const routerEmployees = express.Router();
const Employee = require("../db/employee.model");

  routerEmployees.get("/", async (req, res) => {
    const employees = await Employee.find().sort({ created: "desc" });
    return res.json(employees);
  });

  routerEmployees.use("/:id", async (req, res, next) => {
    let employee = null;
  
    try {
      employee = await Employee.findById(req.params.id);
    } catch (err) {
      return next(err);
    }
  
    if (!employee) {
      return res.status(404).end("Employee not found");
    }
  
    req.employee = employee;
    next();
  });

  routerEmployees.patch("/:id", async (req, res, next) => {
    const employee = req.body;
  
    try {
      const updated = await req.employee.set(employee).save();
      return res.json(updated);
    } catch (err) {
      return next(err);
    }
  });
  
  routerEmployees.get("/:id", (req, res) => {
    return res.json(req.employee);
  }); 
  
  routerEmployees.delete("/:id", async (req, res, next) => {
    try {
      const deleted = await req.employee.delete();
      return res.json(deleted);
    } catch (err) {
      return next(err);
    }
  });
  
  routerEmployees.post("/", async (req, res, next) => {
    const employee = req.body;
  
    try {
      const saved = await Employee.create(employee);
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });
    
module.exports = routerEmployees;