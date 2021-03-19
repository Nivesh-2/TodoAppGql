const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  hello: () => {
    return "Hello World!";
  },

  findUser: async ({ userId }) => {
    // const userId = "600eb5734d87885a550a6a3e";
    const user = await User.findById(userId);
    console.log(user);
    return user;
  },
  findUsers: async () => {
    const users = await User.find({});
    console.log(users);
    return users;
  },
  createUser: async ({ inputVal }) => {
    const hashedpw = await bcrypt.hash(inputVal.password, 12);
    const user = new User({
      name: inputVal.name,
      email: inputVal.email,
      password: hashedpw,
    });
    await user.save();

    return "Done";
  },

  loginUser: async ({ inputVal }) => {
    const user = await User.findOne({ email: inputVal.email });
    const hashedpw = await bcrypt.hash(inputVal.password, 12);
    const res = await bcrypt.compare(inputVal.password, user.password);
    console.log(res);
    if (!res) {
      throw new Error("Failed to login");
    }
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    return token;
  },
};
