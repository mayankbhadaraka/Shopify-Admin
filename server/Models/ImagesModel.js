const DataTypes = require("sequelize");
const con = require("../dbConnection/dbConnection");

const storeImagesData = con.define("images", {
  imageId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  alt: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  variantIds: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
});


con
  .sync()
  .then(() => {
    console.log("Images table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

  module.exports=storeImagesData