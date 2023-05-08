const DataTypes = require("sequelize");
const con = require("../dbConnection/dbConnection");

const storeCustomerAddressData = con.define("addresses", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  address1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

con
  .sync()
  .then(() => {
    console.log("Address table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = storeCustomerAddressData;
