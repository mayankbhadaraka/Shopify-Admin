const Shopify = require("shopify-api-node");
const getCustomerDataFromShopify = require("../GetDataFromShopify/CustomerData");
const storeData = require("../../Models/storeModel");
const getProductsDataFromShopify = require("../GetDataFromShopify/ProductsVarientData");
const saveCreatedCustomer = require("../GetDataFromShopify/saveCreatedCustomer");

const createCustomer = async (req, res) => {
  const shopData = req.shopData;
  const shopify = new Shopify({
    shopName: shopData.dataValues.domain,
    accessToken: shopData.dataValues.accessToken,
  });
  const { firstName, lastName, email, phone, address } = req.body;
  console.log(req.body);
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    phone.length < 10 ||
    address.length === 0
  ) {
    res.status(422).json({ message: "Fill Details Properly." });
  } else {
    const response = await shopify.customer.create({
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
    });
    if (response) {
      try {
        console.log(address);
        const all=address.map(async (i) => {
          console.log(i);
          const reso = await shopify.customerAddress.create(response.id, {
            first_name: response.first_name,
            last_name: response.last_name,
            address1: i?.address1,
            address2: i?.address2 ?? null,
            city: i?.city,
            country: i?.country,
            zip: i?.zip,
          });
          return reso;
        });
        try {
          const resolvedAll = await Promise.all(all);
          const store = await storeData.findOne({
            where: { storeId: shopData.dataValues.storeId },
          });
          await saveCreatedCustomer(response,store,resolvedAll)
        } catch (error) {
          console.log( error);
        }
        res.status(201).json({ message: "Data created Successfully" });
      } catch (error) {
        res.status(400).json({ message: "Not Added" });
      }
    }
  }
};
module.exports = createCustomer;
