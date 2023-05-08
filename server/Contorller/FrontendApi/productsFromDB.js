const storeImagesData = require("../../Models/ImagesModel");
const storeProducts = require("../../Models/ProductsModel");
const storeVarientsData = require("../../Models/VarientsModel");
const { Op } = require("sequelize");

const getProductDataFromDB = async (req, res) => {
  console.log(req.query);
  let limit = parseInt(req.query.limit);
  let page = req.query.page;
  let offset = limit * (page - 1);
  let search = req.query.search;
  const shopData = req.shopData;
  try {
    const findProductCount = await storeProducts.findAndCountAll({
      where: {
        storeStoreId: shopData.storeId,
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { status: { [Op.like]: `%${search}%` } },
          { vendor: { [Op.like]: `%${search}%` } },
          { productId: { [Op.like]: `%${search}%` } },
        ],
      },
    });
    console.log(findProductCount.count);
    const findCustomerData = await storeProducts.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { status: { [Op.like]: `%${search}%` } },
          { vendor: { [Op.like]: `%${search}%` } },
          { productId: { [Op.like]: `%${search}%` } },
        ],
        storeStoreId: shopData.storeId,
      },
      include: [
        {
          model: storeVarientsData,
        },
        {
          model: storeImagesData,
        },
      ],
      limit: limit,
      offset: offset,
    });
    res
      .status(200)
      .json({ data: findCustomerData, count: findProductCount.count });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getProductDataFromDB;
