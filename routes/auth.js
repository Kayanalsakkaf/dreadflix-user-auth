const dotenv = require("dotenv");
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
dotenv.config();

//REGISTER
router.post("/register", async (req, res) => {
  console.log(req.body);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.JWT_SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong password or username!"); // return to stop further execution
    }
    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.JWT_SECRET_KEY
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong password or username!"); // return here as well
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  res.status(200).json({ status: "Service running!" });
});

module.exports = router;
