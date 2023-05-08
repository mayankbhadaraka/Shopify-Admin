const { storeData } = require("../../Models/storeModel");
var shopifyAPI = require("shopify-node-api");
require("dotenv").config();

const firstAuth = async (req, res) => {
  if (!req.query.shop) {
    res.status(401).send("No Shop Found.");
  } else {
    const shopLink = `${req.query.shop}.myshopify.com`;
    var Shopify = new shopifyAPI({
      shop: shopLink, // MYSHOP.myshopify.com
      shopify_api_key: process.env.clientId, // Your API key
      shopify_shared_secret: process.env.clientSecret, // Your Shared Secret
      shopify_scope: process.env.scope,
      redirect_uri: process.env.redirect_url,
      nonce: "nonce", // you must provide a randomly selected value unique for each authorization request
    });
    var auth_url = Shopify.buildAuthURL();
    console.log(auth_url);
    res.redirect(auth_url);
  }
};

module.exports = firstAuth;
