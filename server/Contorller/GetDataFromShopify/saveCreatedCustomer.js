const storeCustomerAddressData = require("../../Models/customerAddressesModel");
const storeCustomerData = require("../../Models/customerModel");
const Shopify = require("shopify-api-node");

const saveCreatedCustomer = async (customer, shop, address) => {
  console.log(customer, address, shop);
  const shopData = shop.dataValues;
  try {
    const enterCustomer = await storeCustomerData.upsert({
      customerId: customer.id,
      email: customer.email,
      firstName: customer.first_name,
      lastName: customer.last_name,
      phone: customer.phone,
      totalSpent: customer.total_spent,
      ordersCount: customer.orders_count,
      storeStoreId: shopData.storeId,
    },{
      where: {
        customerId: customer.id,
      },
    });
    address.map(async (add) => {
      try {
        const enterAddress = await storeCustomerAddressData.upsert({
          userId: add.id,
          addressId: add.id,
          address1: add.address1,
          address2: add.address2,
          city: add.city,
          country: add.country,
          zip: add.zip,
          storeStoreId: shopData.storeId,
          customerCustomerId: add.customer_id,
        },{
          where: {
            addressId: add.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = saveCreatedCustomer;
