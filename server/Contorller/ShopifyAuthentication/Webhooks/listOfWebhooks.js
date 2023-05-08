require("dotenv").config();

let webhookCreateObject = () => {
  let allWebhook = [];
  const webhookURL = process.env.NGROK;
  console.log(webhookURL);
  let orderCreate = {
    topic: "orders/create",
    address: webhookURL,
    format: "json"
  };
  allWebhook.push(orderCreate);
  let orderUpdate = {
    topic: "orders/updated",
    address: webhookURL,
    format: "json"
  };
  allWebhook.push(orderUpdate);
  let orderCancel = {
    topic: "orders/cancelled",
    address: webhookURL,
    format: "json"
  };
  allWebhook.push(orderCancel);
  let orderDelete = {
    topic: "orders/delete",
    address: webhookURL,
    format: "json"
  };
  allWebhook.push(orderDelete);
  let orderFullfilled = {
    topic: "orders/fulfilled",
    address: webhookURL,
    format: "json"
  };
  allWebhook.push(orderFullfilled);
  let orderPartiallyFullfilled = {
    topic: "orders/partially_fulfilled",
    address: webhookURL,
    format: "json"
  };
  allWebhook.push(orderPartiallyFullfilled);
  let productDelete = {
    topic: "products/delete",
    address: webhookURL,
    format: "json"
  };

  allWebhook.push(productDelete);
  let appUnistalled = {
    topic: "app/uninstalled",
    address: webhookURL,
    format: "json"
  };

  allWebhook.push(appUnistalled);

  return allWebhook;
};

module.exports=webhookCreateObject