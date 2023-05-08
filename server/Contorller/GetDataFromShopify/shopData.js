
const storeData = require("../../Models/storeModel");

const shopData = async (data, token) => {
  try {
    const uploadStoreData = await storeData.upsert(
      {
        storeId: data.id,
        storeName: data.name,
        domain: data.domain,
        email: data.email,
        scope: process.env.scope,
        accessToken: token,
      },
      { where: { storeId: data.id } }
    );
    return uploadStoreData;
  } catch (error) {
    console.log(error);
  }
};
module.exports=shopData