const storeCustomerAddressData = require("../../Models/customerAddressesModel");
const storeCustomerData = require("../../Models/customerModel");
const { Op } = require("sequelize");

const getCustomerDataFromDB = async (req, res) => {
  console.log("123123")
  let limit = parseInt(req.query.limit);
  let page = req.query.page;
  let offset = limit * (page - 1);
  const shopData = req.shopData;
  let search = req.query.search;
  try {
    const findCount = await storeCustomerData.findAndCountAll({
      where: {
        [Op.or]: [
          { email: { [Op.like]: `%${search}%` } },
          { firstName: { [Op.like]: `%${search}%` } },
          { lastName: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
        ],
        storeStoreId: shopData.storeId,
      },
    });
    const findCustomerData = await storeCustomerData.findAll({
      where: {
        [Op.or]: [
          { email: { [Op.like]: `%${search}%` } },
          { firstName: { [Op.like]: `%${search}%` } },
          { lastName: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
        ],
        storeStoreId: shopData.storeId,
      },
      include: {
        model: storeCustomerAddressData,
      },
      limit: limit,
      offset: offset,
    });
    res.status(200).json({ data: findCustomerData, count: findCount.count });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getCustomerDataFromDB;
