const storeData = require("./Models/storeModel");
const jwt = require("jsonwebtoken");

const Middleware = async (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token, "ABCDEFGTOKENSET");
  if (token) {
    const data = jwt.verify(token, process.env.SECRATE_KEY);
    console.log(data.id);
    if (data.id) {
      const shopData = await storeData.findOne({ where: { storeId: data.id } });
      req.shopData = shopData;
      next();
    } else {
      console.log("objectABCDEF");
      res.status(401).send("Unauthorized");
    }
  } else {
    console.log("objectABCDEFNOTOKEN");
    res.status(401).send("Unauthorized123");
  }
};
module.exports = Middleware;
