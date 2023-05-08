const storeData=require('./storeModel')
const storeImagesData=require('./ImagesModel')
const storeProducts=require('./ProductsModel')
const storeVarientsData=require('./VarientsModel')
const storeCustomerAddressData=require('./customerAddressesModel')
const storeCustomerData=require('./customerModel')


storeData.hasMany(storeProducts);
storeData.hasMany(storeCustomerData);
storeData.hasMany(storeImagesData);
storeData.hasMany(storeVarientsData);
storeData.hasMany(storeCustomerAddressData);

storeProducts.belongsTo(storeData);
storeProducts.hasMany(storeVarientsData);
storeProducts.hasMany(storeImagesData);

storeCustomerData.belongsTo(storeData);
storeCustomerData.hasMany(storeCustomerAddressData);

storeCustomerAddressData.belongsTo(storeCustomerData);
storeVarientsData.belongsTo(storeProducts);
storeImagesData.belongsTo(storeProducts);