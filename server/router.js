const express = require("express");
const createCustomer = require("./Contorller/FrontendApi/CreateCustomer");
const getCustomerDataFromDB = require("./Contorller/FrontendApi/customerFromDB");
const deleteCustomer = require("./Contorller/FrontendApi/DeleteCustomer");
const editCustomer = require("./Contorller/FrontendApi/EditCustomer");
const loginShop = require("./Contorller/FrontendApi/loginShop");
const Logout = require("./Contorller/FrontendApi/logout");
const getProductDataFromDB = require("./Contorller/FrontendApi/productsFromDB");
const router = express.Router();
const firstAuth=require("./Contorller/ShopifyAuthentication/firstAuthentication")
const secondAuth=require("./Contorller/ShopifyAuthentication/secondAuth");
const pagination = require("./Contorller/testPagination");
const Middleware = require("./Middleware");
const getWebhooks = require("./Contorller/ShopifyAuthentication/Webhooks/getwebhook");


router.get("/auth", firstAuth);
router.get("/api/auth", secondAuth);
router.get("/getShopData",Middleware,loginShop)
router.get("/logout", Logout);

router.get("/pagination",pagination)

router.post("/createCustomer",Middleware,createCustomer)
router.post('/editCustomer',Middleware,editCustomer)
router.delete('/deleteCustomer',Middleware,deleteCustomer)

router.post('/webhooks',getWebhooks)


router.get('/getCustomerFromDB',Middleware,getCustomerDataFromDB)
router.get('/getProductFromDB',Middleware,getProductDataFromDB)



module.exports = router;
