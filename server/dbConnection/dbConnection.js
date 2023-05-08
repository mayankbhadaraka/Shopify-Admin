const Sequelize = require("sequelize");
require('dotenv').config()

const sequelize = new Sequelize(
 process.env.Database,
 process.env.User,
 process.env.Password,
  {
    host: 'localhost',
    dialect: 'mysql',
    logging:false
  }
);
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 module.exports=sequelize