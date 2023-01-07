require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const Employee = require("./db/employee.model");

//const routerEmployees = require("./routes/employees");
const routerFilterEmployees = require("./routes/filteredEmployees");
const routerSortingEmployees = require("./routes/sortedEmployees");

const routerEquipment = require("./routes/equipment");
const routerFilterEquipment = require("./routes/filteredEquipment");
const routerSortingEquipment = require("./routes/sortedEquipment");

const routerMissingEmployees = require("./routes/missingEmployees")

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(express.json());

app.use("/api/employees/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});

// app.use("/api/emloyees", routerEmployees);
app.use("/api/filtered", routerFilterEmployees);
app.use("/api/sorted", routerSortingEmployees);

app.use("/api/equipment", routerEquipment);
app.use("/api/equipment/filtered", routerFilterEquipment);
app.use("/api/equipment/sorted", routerSortingEquipment);

app.use("/api/attendence", routerMissingEmployees);

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

// app.get("/api/employees/:id", (req, res) => {
//   return res.json(req.employee);
// }); 

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.put("/api/attendence/:id", async (req, res, next) => {
  Employee.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
        Employee.findOne({_id: req.params.id})
        .then((employee) => {
            console.log(employee)
        });
    });
});
  
app.patch("/api/employees/:id", async (req, res, next) => {
  const employee = req.body;

  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/employees/:id", (req, res) => {
  return res.json(req.employee);
}); 

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});