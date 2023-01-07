/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const amount = require("./amounts.json");
const equipmentsFile = require("./equipments.json");
const Equipment = require("../db/equipment.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const equipEmployees = async () => {
  await Equipment.deleteMany({});

  const equipments = equipmentsFile.map((x) => ({
    name: x.name,
    type: x.type,
    amount: pick(amount)
  }));

  await Equipment.create(...equipments);
  console.log("Equipment created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await equipEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});