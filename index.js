const express = require("express");
const cors = require("cors");
const app = express(); 
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users"); 
const db = require("./models");

dotenv.config();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
db.sequelize.sync({alert: true});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(process.env.PORT || 3001, () => {
  console.log("Backend server is running!");
});
