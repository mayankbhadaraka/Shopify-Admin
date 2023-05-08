const jwt = require("jsonwebtoken");
require('dotenv').config()
const crypto = require("crypto");

function generateAccessToken(id) {
    return jwt.sign({ id }, process.env.SECRATE_KEY);
  }



const hash = (message, secret) => {
    const hash = crypto.createHmac("sha256", secret);
    hash.update(message);
    return hash.digest("hex");
  };




module.exports={generateAccessToken,hash}