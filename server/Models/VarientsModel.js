const DataTypes = require("sequelize");
const con = require("../dbConnection/dbConnection");


const storeVarientsData = con.define("variants", {
    variantId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grams: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    inventoryQuantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  
  con
  .sync()
  .then(() => {
    console.log("Varients table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

  module.exports=storeVarientsData