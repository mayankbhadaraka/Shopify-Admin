const DataTypes = require("sequelize");
const con = require("../dbConnection/dbConnection");


const storeProducts = con.define("products", {
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bodyHtml: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    vendor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminGraphqlApiId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });


  con
  .sync()
  .then(() => {
    console.log("Products table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

  module.exports=storeProducts