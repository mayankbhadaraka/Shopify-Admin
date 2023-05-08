const DataTypes = require("sequelize");
const con = require("../dbConnection/dbConnection");

const storeData = con.define("stores", {
  storeId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  storeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  domain: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  scope: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

con
  .sync()
  .then(() => {
    console.log("Store table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = storeData;
