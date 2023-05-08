const storeCustomerAddressData = require("../../Models/customerAddressesModel");
const storeCustomerData = require("../../Models/customerModel");
const Shopify = require("shopify-api-node");

const getCustomerDataFromShopify = async (shop) => {
  const shopData = shop.dataValues;
  var con = new Shopify({
    shopName: shopData.domain,
    accessToken: shopData.accessToken,
  });
  let params = { limit: 250 };
  do {
    const uploadData = await con.customer.list(params);
    uploadData.map(async (item) => {
      try {
        const [enterCustomer, customerCreated] = await storeCustomerData.upsert(
          {
            customerId: item.id,
            email: item.email,
            firstName: item.first_name,
            lastName: item.last_name,
            phone: item.phone,
            totalSpent: item.total_spent,
            ordersCount: item.orders_count,
            storeStoreId: shopData.storeId,
          },
          {
            where: {
              customerId: item.id,
            },
          }
        );
        item.addresses.map(async (add) => {
          try {
            const [enterAddress, addressCreated] =
              await storeCustomerAddressData.upsert(
                {
                  userId: add.id,
                  addressId: add.id,
                  address1: add.address1,
                  address2: add.address2,
                  city: add.city,
                  country: add.country,
                  zip: add.zip,
                  storeStoreId: shopData.storeId,
                  customerCustomerId: enterCustomer.dataValues.customerId,
                },
                {
                  where: {
                    addressId: add.id,
                  },
                }
              );
          } catch (error) {
            console.log(error,"Error");
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
    params = uploadData.nextPageParameters;
  } while (params !== undefined);
};

module.exports = getCustomerDataFromShopify;
