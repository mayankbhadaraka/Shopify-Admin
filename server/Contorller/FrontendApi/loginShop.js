const {storeData} = require("../../Models/storeModel");

const loginShop = async (req, res) => {
  const shopExist =req.shopData
  if (shopExist) {
    const sendObj = {
      domain: shopExist.dataValues.domain,
      email: shopExist.dataValues.email,
      storeId: shopExist.dataValues.storeId,
      storeName: shopExist.dataValues.storeName,
      accessToken: shopExist.dataValues.accessToken,
    };
    res.status(200).json({ shop: sendObj });
  } else {
    res.status(404).send("No Data Found");
  }
};

module.exports = loginShop;
