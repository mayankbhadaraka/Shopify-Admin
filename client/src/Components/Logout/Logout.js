import { Text } from "@shopify/polaris";
import React, { useContext, useEffect } from "react";
import context from "../../Context/context";
import fetchData from "../../Helper/FetchApi";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setShop, setPage, setSearch } =
    useContext(context);
    const navigate = useNavigate()
  const logoutApi = async () => {
    const data = await fetchData("/logout");
    setShop({});
    setPage(0);
    setSearch('');
    navigate('http://localhost:5000/login')
  };
  useEffect(() => {
    logoutApi();
  }, []);
  return (
    <div>
      <Text variant="heading2xl" as="h1">
        {" "}
        Logout Successfully
      </Text>
    </div>
  );
};

export default Logout;
