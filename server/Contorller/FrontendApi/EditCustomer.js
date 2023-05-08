const Shopify = require("shopify-api-node");
const getCustomerDataFromShopify = require("../GetDataFromShopify/CustomerData");
const getProductsDataFromShopify = require("../GetDataFromShopify/ProductsVarientData");
const storeData = require("../../Models/storeModel");
const saveCreatedCustomer = require("../GetDataFromShopify/saveCreatedCustomer");
const editCustomer = async (req, res) => {
  const shopData = req.shopData;
  console.log(shopData)
  const shopify = new Shopify({
    shopName: shopData.dataValues.domain,
    accessToken: shopData.dataValues.accessToken,
  });
  const { firstName, lastName, email, phone, addresses, customerId } = req.body;
  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      phone.length < 10 ||
      addresses.length === 0
    ) {
      res.status(422).json({ message: "Fill Details Properly." });
    } else {
      try {
        const response = await shopify.customer.update(customerId, {
          email: email,
          first_name: firstName,
          last_name: lastName,
          phone: phone,
        });
        if (response) {
          try {
            const all=addresses.map(async (i) => {
              if (i.addressId) {
                const reso = await shopify.customerAddress.update(
                  response.id,
                  i.addressId,
                  {
                    first_name: firstName,
                    last_name: lastName,
                    address1: i?.address1,
                    address2: i?.address2 ?? null,
                    city: i?.city,
                    country: i?.country,
                    zip: i?.zip,
                  }
                );
                return reso
              } else {
                const reso = await shopify.customerAddress.create(response.id, {
                  first_name: firstName,
                  last_name: lastName,
                  address1: i?.address1,
                  address2: i?.address2 ?? null,
                  city: i?.city,
                  country: i?.country,
                  zip: i?.zip,
                });
                return reso
              }
            });
            try {
              const resolvedAll = await Promise.all(all);
              const store = await storeData.findOne({
                where: { storeId:shopData.dataValues.storeId},
              });
              await saveCreatedCustomer(response,store,resolvedAll)
              res.status(201).json({ success: "Data created Successfully" });
            } catch (error) {
              console.log( error);
            }
            // const data=await storeData.findOne({where:{storeId:shopData.dataValues.storeId}})
            // await getCustomerDataFromShopify(data);
          } catch (error) {
            res.status(400).json({ success: "Not Added" });
          }
          // console.log(data)
        }
      } catch (error) {
        // res.status(404).json({ message: error });
        console.log(error)
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
module.exports = editCustomer;
