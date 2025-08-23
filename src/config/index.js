require("dotenv").config();

let config = {
  dbUrl: process.env.DBURL,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  env: process.env.NODE_ENV,
  domain: process.env.DOMAIN,
  origin: process.env.ORIGIN,
  allowedOrigins: ["http://localhost:3000", "http://localhost:5173"],
};

module.exports = config;
