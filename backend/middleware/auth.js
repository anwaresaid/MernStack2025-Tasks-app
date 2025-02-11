const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(
      token,
      "ebcd4f797ae5b85d829fc048e15c438d5baea28071e0199f9f829333918f6e67"
    ); // Replace 'your_jwt_secret' with your actual secret
    console.log("decoded", decoded);
    const user = await User.findById(decoded.userId);
    console.log("user", user);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate." });
  }
};

module.exports = authMiddleware;
