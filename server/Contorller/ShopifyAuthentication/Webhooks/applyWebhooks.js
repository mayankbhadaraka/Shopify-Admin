const { default: axios } = require('axios')
const webhookCreateObject=require('./listOfWebhooks')


const ApplyWebhooks=(accessToken)=>{
    const webhooks=webhookCreateObject()
    try {
        console.log("Applying")
        webhooks.map((webhook)=>{
            createWebhooks(webhook,accessToken)
        })
    } catch (error) {
        console.log("error",error)
    }
    console.log("Webhooks Created successfully.")
}

const createWebhooks = (data,accessToken) => {
    const obj={
        "webhook":data
    }
  return new Promise(async (resolve, reject) => {
    options={
        headers:{
            "X-Shopify-Access-Token":accessToken,
            "content-type":"application/json"
        }
    }
    const path = `https://mayank-traning.myshopify.com/admin/api/2023-01/webhooks.json`;
    await axios
      .post(path, obj, options)
      .then((res) => resolve(res))
      .catch((err) => {
        reject(err);
      });
  });
};


module.exports=ApplyWebhooks