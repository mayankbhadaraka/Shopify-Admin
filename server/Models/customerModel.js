const DataTypes = require("sequelize");
const con = require("../dbConnection/dbConnection");

const storeCustomerData = con.define("customers", {
    customerId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalSpent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ordersCount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  con
  .sync()
  .then(() => {
    console.log("Customers table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

  module.exports=storeCustomerData