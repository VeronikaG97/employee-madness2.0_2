require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const routerFilterEmployees = require("./routes/filteredEmployees");
const routerSortingEmployees = require("./routes/sortedEmployees");

const routerEquipment = require("./routes/equipment");
const routerFilterEquipment = require("./routes/filteredEquipment");
const routerSortingEquipment = require("./routes/sortedEquipment");

const routerAttendence = require("./routes/attendence");
const routerEmployees = require("./routes/employees");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(express.json());

app.use("/api/employees", routerEmployees);
app.use("/api/filtered", routerFilterEmployees);
app.use("/api/sorted", routerSortingEmployees);

app.use("/api/equipment", routerEquipment);
app.use("/api/equipment/filtered", routerFilterEquipment);
app.use("/api/equipment/sorted", routerSortingEquipment);

app.use("/api/attendence", routerAttendence);

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