const express = require("express");
const router = require("./router");
const cors = require("cors");
require("./Models/relation");
require("./dbConnection/dbConnection");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
// const LoginPage = require("./Login Page/Login.html");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/", router);
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


app.get("/", (req, res) => {
  res.send("Hello login world from the server");
  res.end();
});
app.get("/login", (req, res) => {
    const loginHtml = path.join(__dirname, './Login Page/Login.html')
    res.sendFile(loginHtml)
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});
