const { default: axios } = require("axios");

const pagination = async (req, res) => {
  const headers = {
    "X-Shopify-Access-Token": "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",
  };
  let link = `https://mayank-traning.myshopify.com/admin/api/2021-07/customers.json?limit=10`;
  while (link) {
    const data = await axios.get(link, {
      headers,
    });
    console.log(data.headers.link);
    let slice = data.headers.link.split(",");
    console.log(slice);
    let newlink = slice.filter((item) => {
      return item.includes(`rel="next"`);
    });
    if (newlink[0]) {
      let a = newlink[0].match(/<(.*?)>/);
      console.log(a[1]);
      link = a[1];
    } else {
        console.log("Done")
      link = false;
    }
  }
};

module.exports = pagination;
