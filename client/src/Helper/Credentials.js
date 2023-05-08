const clientId = "696bfd3c5c881618228bb90c2ccda1f0"
const clientSecret = "8bdc581749dee56226beb6f429b7d33b"
const scope = "write_customers,write_products,write_orders"
const redirect_url = "http://localhost:5000/api/auth"
const access_mode = "per-user"

const credentials={
    clientId,clientSecret,scope,redirect_url,access_mode
}

export default credentials