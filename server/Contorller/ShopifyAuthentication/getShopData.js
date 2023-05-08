const uploadShopData = require("../GetDataFromShopify/shopData");
const Shopify = require("shopify-api-node");

const getShopData = async (accessToken, shop) => {
  console.log(shop)
  var con = new Shopify({
    shopName: shop,
    accessToken: accessToken,
  });
  const uploadData = await con.shop.get();
  // console.log(uploadData);
  const data = await uploadShopData(uploadData, accessToken);
  return data;
};

module.exports = getShopData;
