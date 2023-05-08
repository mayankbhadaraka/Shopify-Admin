const storeCustomerAddressData = require("../../Models/customerAddressesModel");
const storeCustomerData = require("../../Models/customerModel");
const Shopify = require("shopify-api-node");

const deleteCustomer = async (req, res) => {
  const id = req.query.id;
  const shopData = req.shopData;
  const shopify = new Shopify({
    shopName: shopData.dataValues.domain,
    accessToken: shopData.dataValues.accessToken,
  });
  try {
    const reso = await shopify.customer.delete(id);
    await storeCustomerData.destroy({ where: { customerId: id } });
    await storeCustomerAddressData.destroy({
      where: { customerCustomerId: id },
    });
    console.log(reso,"DONE");
  } catch (error) {
    console.log(error,"HERE");
    // res.send(error);
  }
  res.status(200).json({ message: "Customer deleted successfully" });
};

module.exports = deleteCustomer;
