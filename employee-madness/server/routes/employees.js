/* //To-Do?


const express = require("express");
const routerEmployees = express.Router();
const Employee = require("../db/employee.model");

routerEmployees.get("/", async (req, res) => {
    const employees = await EmployeeModel.find().sort({ created: "desc" });
    return res.json(employees);
});
 
routerEmployees.get("/:id", (req, res) => {
    return res.json(req.employee);
}); 

routerEmployees.post("/", async (req, res, next) => {
    const employee = req.body;

    try {
        const saved = await EmployeeModel.create(employee);
        return res.json(saved);
    } catch (err) {
        return next(err);
    }
});

routerEmployees.patch("/api/employees/:id", async (req, res, next) => {
    const employee = req.body;

    try {
        const updated = await req.employee.set(employee).save();
        return res.json(updated);
    } catch (err) {
        return next(err);
    }
});

routerEmployees.delete("/api/employees/:id", async (req, res, next) => {
    try {
        const deleted = await req.employee.delete();
        return res.json(deleted);
    } catch (err) {
        return next(err);
    }
});

module.exports = routerEmployees; */