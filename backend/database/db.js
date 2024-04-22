const mongoose = require("mongoose");
require("dotenv").config();

async function Database() {
  try {
    await mongoose.connect(process.env.CLUSTER, { useNewUrlParser: true });
    console.log(`Connected to database`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = Database;
