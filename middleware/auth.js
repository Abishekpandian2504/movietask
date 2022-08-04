const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // if (!config.get("requiresAuth")) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
   // req.user = decoded; // only _id of the user in the payload
    //req.farmer = decoded;
    req.farmeruse = decoded;
    next(); // route handler
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
// module.exports = auth;
