const { default: axios } = require("axios");
const { generateAccessToken,hash } = require("../../Helper/Helper");
const getCustomerDataFromShopify = require("../GetDataFromShopify/CustomerData");
const getProductsDataFromShopify = require("../GetDataFromShopify/ProductsVarientData");
const getShopData = require("./getShopData");
const ApplyWebhooks=require('./Webhooks/applyWebhooks');


const secondAuth = async (req, res) => {
  const obj = {
    code: req.query.code,
    host: req.query.host,
    shop: req.query.shop,
    state: req.query.state,
    timestamp: req.query.timestamp,
  };
  const query = new URLSearchParams(obj).toString();
  const calculatedHmac = hash(query, process.env.clientSecret);
  if (calculatedHmac === req.query.hmac) {
    try {
      
      const response = await axios.post(
        `https://${req.query.shop}/admin/oauth/access_token`,
        {
          client_id: process.env.clientId,
          client_secret: process.env.clientSecret,
          code: req.query.code,
        }
      );
      const accessToken = response.data.access_token;
      const data = await getShopData(accessToken, req.query.shop);
      const token=generateAccessToken(data[0].dataValues.storeId)
      res.cookie("access_token", token, {
        httpOnly: true,
      });
      await getCustomerDataFromShopify(data[0])
      await getProductsDataFromShopify(data[0])
      console.log("Applying webhooks")
      // await ApplyWebhooks(accessToken)
      res.redirect(`http://localhost:3000/`);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(401).send("Invalid HMAC");
  }
};

module.exports = secondAuth;
