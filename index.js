const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const db = require("./models");
const connectDB = require("./utils/db");

dotenv.config();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
// Connect to DocumentDB
connectDB();

app.use("user-auth/api/auth", authRoute);
app.use("user-auth/api/users", userRoute);

app.listen(process.env.PORT || 30082, () => {
  console.log("Backend server is running! on PORT:" + process.env.PORT);
});