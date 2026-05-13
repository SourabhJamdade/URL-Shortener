const mongoose = require("mongoose");
require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8']);

async function connectDB() {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
}

module.exports = connectDB;
