const storeImagesData = require("../../Models/ImagesModel");
const storeProducts = require("../../Models/ProductsModel");
const storeVarientsData = require("../../Models/VarientsModel");
const Shopify = require("shopify-api-node");

const getProductsDataFromShopify = async (shop) => {
  const shopData = shop.dataValues;
  var con = new Shopify({
    shopName: shopData.domain,
    accessToken: shopData.accessToken,
  });
  let params = { limit: 250 };

  do {
    const uploadData = await con.product.list(params);
    if (uploadData) {
      uploadData.map(async (item) => {
        const [createProducts, productCreated] = await storeProducts.upsert(
          {
            productId: item.id,
            title: item.title,
            bodyHtml:item.body_html,
            vendor: item.vendor,
            productType: item.product_type,
            adminGraphqlApiId: item.admin_graphql_api_id,
            status: item.status,
            storeStoreId: shopData.storeId,
          },
          {
            where: {
              productId: item.id,
            },
          }
        );
        item.variants.map(async (varients) => {
          const [createVarients, varientsCreated] =
            await storeVarientsData.upsert(
              {
                variantId: varients.id,
                title: varients.title,
                grams: varients.grams,
                sku: varients.sku,
                imageId: varients.image_id,
                inventoryQuantity: varients.inventory_quantity,
                price: varients.price,
                storeStoreId: shopData.storeId,
                productProductId: createProducts.dataValues.productId,
              },
              {
                where: {
                  variantId: varients.id,
                },
              }
            );
        });
        item.images.map(async (img) => {
          const [createImages, imgCreated] = await storeImagesData.upsert(
            {
              imageId: img.id,
              alt: img.alt,
              src: img.src,
              variant_ids: img.variant_ids,
              storeStoreId: shopData.storeId,
              productProductId: createProducts.dataValues.productId,
            },
            {
              where: {
                imageId: img.id,
              },
            }
          );
        });
      });
    } else {
      console.log("No Data Found.");
    }
    params = uploadData.nextPageParameters;
  } while (params !== undefined);
};
module.exports = getProductsDataFromShopify;
