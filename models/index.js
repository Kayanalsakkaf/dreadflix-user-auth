

const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
console.log(process.env.DATABASE_NAME);

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE,
  dialect:  process.env.DATABASE_DIALECET,
  port: process.env.DATABASE_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/User")(sequelize, Sequelize);
 

db.ROLES = ["user", "admin"];

module.exports = db;