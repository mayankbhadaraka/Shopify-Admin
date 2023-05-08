import React, { useContext, useEffect, useState } from "react";
import context from "../../Context/context";
import Model from "../Model/EditCustomerModel";
import fetchData from "../../Helper/FetchApi";
import Table from "../Table/Table";

const Customer = () => {
  const {
    modelName,
    setLoading,
    loading,
    model,
    limit,
    search,
    setPage,
    page,
  } = useContext(context);
  const column = [
    "firstName",
    "lastName",
    "email",
    "totalSpent",
    "totalSpent",
    "phone",
    "Edit",
    "Delete",
  ];
  const [customers, setCustomers] = useState([]);
  const columnType = ["text", "text", "email", "numeric", "numeric", "numeric"];
  const getCustomerData = async () => {
    console.log(limit, page);
    const data = await fetchData(
      `/getCustomerFromDB?limit=${limit}&page=${page + 1}&search=${search}`
    );
    setCustomers(data);
    setLoading(false);
  };
  // useEffect(() => {
  //   getCustomerData();
  // }, []);
  console.log(customers);
  useEffect(() => {
    setLoading(true);
    getCustomerData();
  }, [limit, page]);
  useEffect(() => {
    if (model == false) {
      getCustomerData();
    } else {
      return;
    }
  }, [model]);
  useEffect(() => {
      const time = setTimeout(() => {
        setPage(0);
        setLoading(true);
        getCustomerData();
      }, 800);
      return () => {
        clearTimeout(time);
      };
  }, [search]);
  return (
    <div id="customers">
      <div className="emptySpace"></div>
      <div className="customerData">
        {modelName == "editCustomer" ? <Model /> : null}
        <Table
          row={customers.data}
          title={"CustomerData"}
          column={column}
          count={customers.count}
          columnType={columnType}
          btn={"Create Customer"}
        />
      </div>
    </div>
  );
};

export default Customer;
