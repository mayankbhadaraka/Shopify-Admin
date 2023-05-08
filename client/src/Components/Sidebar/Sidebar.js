import { Navigation } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import {
  HomeMinor,
  ProductsMinor,
  CustomersMajor,
} from "@shopify/polaris-icons";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "@shopify/polaris";
import context from "../../Context/context";
import fetchData from "../../Helper/FetchApi";
import Welcome from "../WelcomePage/Welcome";
import Customer from "../Customers/Customer";
import Product from "../Products/products";

function Sidebar() {
  const {
    setShop,
    shop,
    setPage,
    setSearch,
  } = useContext(context);
  const [link, setLink] = useState("home");

  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  const getShopData = async () => {
    const data = await fetchData("/getShopData");
    setShop(data.shop);
  };

  useEffect(() => {
    getShopData();
  }, []);
  return (
    <div className="container">
      {shop.storeName ? (
        <div className="sidebar">
          <Navigation location="/">
            <Navigation.Section
              items={[
                {
                  url: "#",
                  label: "Home",
                  icon: HomeMinor,
                  selected: link == "home" ? true : false,
                  onClick: () => {
                    setLink("home");
                  },
                },
                {
                  url: "#customers",
                  excludePaths: ["#"],
                  label: "Customers",
                  selected: link == "customer" ? true : false,
                  icon: CustomersMajor,
                  onClick: () => {
                    setPage(0);
                    setSearch("");
                    setLink("customer");
                  },
                },
                {
                  url: "#products",
                  excludePaths: ["#"],
                  label: "Products",
                  icon: ProductsMinor,
                  selected: link == "product" ? true : false,
                  onClick: () => {
                    setPage(0);
                    setLink("product");
                  },
                },
              ]}
            />
          </Navigation>
          <div className="info">
            {link === "home" ? <Welcome /> : null}
            {link === "customer" ? <Customer /> : null}
            {link === "product" ? <Product /> : null}
          </div>
        </div>
      ) : (
        <div id="Welcome">
          <Spinner accessibilityLabel="Spinner" size="large" />
          <h1>Loading Your Shop Data.</h1>
        </div>
      )}
    </div>
  );
}
export default Sidebar;
